import http from 'http';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { registerEmailRoute } from './routes.js';

const PORT = Number(process.env.PORT || 3013);

const app = express();
app.use(express.json({ limit: '1mb' }));
registerEmailRoute(app);

const server = http.createServer(app);

const vite = await createViteServer({
  server: {
    middlewareMode: true,
    hmr: { server },
  },
  appType: 'spa',
});

app.use(vite.middlewares);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Dev server running on http://localhost:${PORT}`);
});
