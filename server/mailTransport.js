import dns from 'dns';
import net from 'net';
import nodemailer from 'nodemailer';
import { buildApplicationEmailHtml } from '../src/utils/emailTemplate.js';
import { smtpConfig } from './smtpConfig.js';

dns.setDefaultResultOrder('ipv4first');

let workingProfileName = null;
let resolvedHost = null;

function buildTlsOptions(servername) {
  return {
    servername,
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    minVersion: 'TLSv1.2',
  };
}

function getSmtpProfiles() {
  const host = resolvedHost || smtpConfig.host;
  const configured = {
    name: 'configured',
    host,
    servername: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    requireTLS: !smtpConfig.secure,
  };

  const profiles = [configured];
  const seen = new Set([`${configured.port}:${configured.secure}`]);

  const fallbacks = [
    { name: '587-starttls', port: 587, secure: false, requireTLS: true },
    { name: '465-ssl', port: 465, secure: true, requireTLS: false },
  ];

  for (const fallback of fallbacks) {
    const key = `${fallback.port}:${fallback.secure}`;
    if (!seen.has(key)) {
      profiles.push({
        ...fallback,
        host,
        servername: smtpConfig.host,
      });
      seen.add(key);
    }
  }

  return profiles;
}

function orderProfiles(profiles) {
  if (!workingProfileName) return profiles;

  const preferred = profiles.find((profile) => profile.name === workingProfileName);
  if (!preferred) return profiles;

  return [preferred, ...profiles.filter((profile) => profile.name !== workingProfileName)];
}

function createTransporter(profile) {
  return nodemailer.createTransport({
    host: profile.host,
    port: profile.port,
    secure: profile.secure,
    requireTLS: profile.requireTLS,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
    family: 4,
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 20000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 20000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 30000),
    tls: buildTlsOptions(profile.servername),
  });
}

function testTcpPort(host, port, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, family: 4, timeout: timeoutMs });

    socket.on('connect', () => {
      socket.end();
      resolve({ port, ok: true });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({ port, ok: false, error: err.code || err.message });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ port, ok: false, error: 'ETIMEDOUT' });
    });
  });
}

async function resolveMailHost() {
  try {
    const result = await dns.promises.lookup(smtpConfig.host, { family: 4 });
    resolvedHost = result.address;
    console.log(`[mail] Resolved ${smtpConfig.host} -> ${resolvedHost}`);
    return resolvedHost;
  } catch (err) {
    console.error(`[mail] DNS lookup failed for ${smtpConfig.host}:`, err.message);
    resolvedHost = smtpConfig.host;
    return resolvedHost;
  }
}

export function getMailTransportInfo() {
  return {
    host: smtpConfig.host,
    resolvedHost,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    user: smtpConfig.user,
    from: smtpConfig.from,
    to: smtpConfig.to,
    passwordConfigured: Boolean(smtpConfig.pass),
    profiles: getSmtpProfiles().map((profile) => ({
      name: profile.name,
      port: profile.port,
      secure: profile.secure,
    })),
  };
}

async function logOutboundIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    console.log('[mail] Server outbound IP (whitelist on mail firewall if needed):', data.ip);
  } catch {
    console.warn('[mail] Could not detect outbound IP');
  }
}

export async function diagnoseMailConnectivity() {
  await logOutboundIp();
  const host = await resolveMailHost();
  const ports = [...new Set(getSmtpProfiles().map((profile) => profile.port))];
  const results = [];

  for (const port of ports) {
    results.push(await testTcpPort(host, port));
  }

  for (const result of results) {
    if (result.ok) {
      console.log(`[mail] TCP port ${result.port}: reachable`);
    } else {
      console.error(`[mail] TCP port ${result.port}: blocked (${result.error})`);
    }
  }

  const anyReachable = results.some((result) => result.ok);
  if (!anyReachable) {
    console.error(
      '[mail] This container cannot reach your mail host on SMTP ports. ' +
        'On Dokploy/VPS: whitelist the outbound IP above in your mail server firewall (cPanel CSF/WHM), ' +
        'or if mail runs on the same VPS set SMTP_HOST=host.docker.internal and SMTP_PORT=587.'
    );
  }

  return { host, results, anyReachable };
}

async function verifyProfile(profile) {
  const transporter = createTransporter(profile);
  try {
    await transporter.verify();
    return profile;
  } finally {
    transporter.close();
  }
}

export async function verifyMailConnection() {
  await diagnoseMailConnectivity();

  const errors = [];
  for (const profile of getSmtpProfiles()) {
    try {
      const verified = await verifyProfile(profile);
      workingProfileName = verified.name;
      return {
        profile: verified.name,
        port: verified.port,
        secure: verified.secure,
        host: smtpConfig.host,
      };
    } catch (err) {
      errors.push(`${profile.name} (port ${profile.port}): ${err.code || err.message}`);
    }
  }

  throw new Error(`SMTP connection failed: ${errors.join('; ')}`);
}

async function sendViaSmtp(mailOptions) {
  const errors = [];

  for (const profile of orderProfiles(getSmtpProfiles())) {
    const transporter = createTransporter(profile);

    try {
      const info = await transporter.sendMail(mailOptions);
      workingProfileName = profile.name;
      console.log(
        `[send-email] Sent via SMTP ${profile.name} (port ${profile.port}) messageId=${info.messageId}`
      );
      return info;
    } catch (err) {
      errors.push(`${profile.name}: ${err.code || err.message}`);
      console.warn(`[send-email] SMTP ${profile.name} failed:`, err.code || err.message);
    } finally {
      transporter.close();
    }
  }

  throw new Error(`All SMTP attempts failed: ${errors.join('; ')}`);
}

export async function sendApplicationEmail(formData) {
  if (!smtpConfig.pass) {
    throw new Error('SMTP_PASS is not configured');
  }

  if (!resolvedHost) {
    await resolveMailHost();
  }

  const applicantName = formData.fullName?.trim() || 'Unknown Applicant';
  const html = buildApplicationEmailHtml(formData);

  await sendViaSmtp({
    from: smtpConfig.from,
    to: smtpConfig.to,
    replyTo: formData.email?.trim() || undefined,
    subject: `New Application — ${applicantName}`,
    html,
  });
}
