import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerEmailRoute } from './routes.js';
import { smtpConfig } from './smtpConfig.js';
import { verifySmtpConnection } from './sendApplicationEmail.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3014);

const app = express();
app.use(express.json({ limit: '1mb' }));

app.use((req, _res, next) => {
  if (req.path.startsWith('/api/')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  }
  next();
});

registerEmailRoute(app);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fulcrum website running on http://0.0.0.0:${PORT}`);
  console.log('SMTP config:', {
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    user: smtpConfig.user,
    from: smtpConfig.from,
    to: smtpConfig.to,
  });

  verifySmtpConnection()
    .then(() => console.log('SMTP connection verified successfully'))
    .catch((err) => {
      console.error('SMTP connection check failed:', err.message);
      if (err.code) console.error('SMTP error code:', err.code);
    });
});
