export const smtpConfig = {
  host: process.env.SMTP_HOST || 'mail.fulcrum.com.na',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== 'false',
  user: process.env.SMTP_USER || 'build@fulcrum.com.na',
  pass: process.env.SMTP_PASS || '',
  from: process.env.SMTP_FROM || 'build@fulcrum.com.na',
  to: process.env.SMTP_TO || 'build@fulcrum.com.na',
};
