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
      console.error(
        'If ports show as blocked above, your deployment host blocks outbound SMTP. ' +
          'Run this app on the same server/network as mail.fulcrum.com.na (not a blocked cloud platform).'
      );
    });
});
