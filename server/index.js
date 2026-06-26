import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerEmailRoute } from './routes.js';
import { getMailTransportInfo, verifyMailConnection } from './sendApplicationEmail.js';

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
  console.log('SMTP config:', getMailTransportInfo());

  verifyMailConnection()
    .then((result) => console.log('SMTP connection ready:', result))
    .catch((err) => {
      console.error('SMTP connection check failed:', err.message);
      const info = getMailTransportInfo();
      if (!info.passwordConfigured) {
        console.error('SMTP_PASS is not set. Add it in Dokploy → Environment, then redeploy.');
      }
      console.error(
        'Dokploy/VPS fix: whitelist the outbound IP from logs on mail.fulcrum.com.na, ' +
          'or use SMTP_HOST=host.docker.internal if mail runs on the same VPS.'
      );
    });
});
