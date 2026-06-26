import nodemailer from 'nodemailer';
import { buildApplicationEmailHtml } from '../src/utils/emailTemplate.js';
import { smtpConfig } from './smtpConfig.js';

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.pass,
  },
  tls: {
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
  },
});

export async function verifySmtpConnection() {
  await transporter.verify();
}

export async function sendApplicationEmail(formData) {
  const applicantName = formData.fullName?.trim() || 'Unknown Applicant';
  const html = buildApplicationEmailHtml(formData);

  await transporter.sendMail({
    from: smtpConfig.from,
    to: smtpConfig.to,
    replyTo: formData.email?.trim() || undefined,
    subject: `New Application — ${applicantName}`,
    html,
  });
}
