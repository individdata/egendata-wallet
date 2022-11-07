// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocket } = require('ws');
const pino = require('pino');
const config = require('./logging.config');

const logger = pino(config);
const wsLogger = logger.child({ module: 'ws' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const wss = new WebSocket.Server({ noServer: true });

const wsClients = new Map();

wss.on('connection', (ws, req) => {
  wsLogger.info(`WSS ${req.url}`, (env = 'wss'));
  const id = req.url.split('/').pop();
  wsLogger.info(`id = ${id}`);

  let sockets = wsClients.get(id);
  if (!sockets) {
    sockets = [];
    wsLogger.debug('Adding empty sockets array.');
    wsClients.set(id, sockets);
  }

  wsLogger.debug('Adding socket to array.');
  sockets.push(ws);
  ws.on('close', () => {
    wsLogger.debug(`Socket closed: ${id}`);
    const sockets = wsClients.get(id);
    if (sockets) {
      const index = sockets.indexOf(ws);
      if (index !== -1) {
        wsLogger.debug('Removing socket from array.', ws);
        sockets.splice(index, 1);
      }
    }
  });
  ws.on('error', (err) => {
    wsLogger.warning('WebSocket error: ', err);
  });
});

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      req.wsClients = wsClients;
      await handle(req, res, parsedUrl);
    } catch (err) {
      logger.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error.');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on http://${hostname}:${port}`);
  });

  server.on('upgrade', async (req, socket, head) => {
    const { pathname } = parse(req.url, true);
    if (pathname !== '/_next/webpack-hmr') {
      wsLogger.debug('From upgrade event', req.url);
      try {
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req);
        });
      } catch (err) {
        wsLogger.debug('Socket upgrade failed', err);
        socket.destroy();
      }
    }
  });
});
