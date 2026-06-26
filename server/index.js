import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerEmailRoute } from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3014);

const app = express();
app.use(express.json({ limit: '1mb' }));
registerEmailRoute(app);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Fulcrum website running on http://0.0.0.0:${PORT}`);
});
