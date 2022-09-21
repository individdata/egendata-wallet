import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {}

interface CustomNextApiRequest extends NextApiRequest {
  wsClients: Map<string, WebSocket[]>
}

export default async function handler(
  req: CustomNextApiRequest,
  res: NextApiResponse<Data>
) {
  if ( req.method !== "POST" ) {
    res.status(405).json({"error": "Only POST method allowed."})
    return;
  }

  if (req.headers['content-type'] !== 'applicaion/json+ld') {
    res.status(400).setHeader('Accept', 'application/json+ld').json({"error": "Only application/json+ld accepted."});
    return
  }

  const { uuid } = req.query;
  
  const wsClients = req.wsClients;
  const notification = req.body;

  // send the incoming notification to the connected websocket clients
  const clients = wsClients.get(uuid as string);
  if (clients) {
    clients.forEach((client) => client.send(JSON.stringify(notification, undefined, 2)))
  }
  
  res.status(200)
  res.end()
}
