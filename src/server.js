// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocket } = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const wss = new WebSocket.Server({ noServer: true });

const wsClients = new Map();

wss.on('connection', (ws, req) => {
  console.log(`req url = ${req.url}`);
  const id = req.url.split('/').pop();
  console.log(`id = ${id}`);

  let sockets = wsClients.get(id);
  if (!sockets) {
    sockets = [];
    console.log('adding empty sockets array');
    wsClients.set(id, sockets);
  }

  console.log('adding socket to array');
  sockets.push(ws);
  ws.on('close', () => {
    console.log('socket closed: ');
    const sockets = wsClients.get(id);
    if (sockets) {
      const index = sockets.indexOf(ws);
      if (index !== -1) {
        console.log('removing socket from array');
        sockets.splice(index, 1);
      }
    }
  });
  ws.on('error', (err) => {
    console.log('ws error: ', err);
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
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  server.on('upgrade', async (req, socket, head) => {
    const { pathname } = parse(req.url, true);
    if (pathname !== '/_next/webpack-hmr') {
      console.log('From upgrade event', req.url);
      try {
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req);
        });
      } catch (err) {
        console.log('Socket upgrade failed', err);
        socket.destroy();
      }
    }
  });
});
