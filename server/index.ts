import { config } from 'dotenv';
  
config();

import WebsocketServer from './plugins/websocket-server';
import Entrypoint from './plugins/entrypoint';
import Threads from './plugins/threads';
// import Boards from './plugins/boards';
// import Workers from './plugins/cloud-workers';

const entrypoint = new Entrypoint();
const wss = new WebsocketServer(entrypoint);
const threads = new Threads(wss);

// const boards = new Boards(entrypoint);
// const workers = new Workers(entrypoint, wss);

entrypoint.start();
