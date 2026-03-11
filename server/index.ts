import { config } from 'dotenv';
  
config();

import WebsocketServer from './plugins/websocket-server';
import Entrypoint from './plugins/entrypoint';
// import Boards from './plugins/boards';
// import Workers from './plugins/cloud-workers';

const entrypoint = new Entrypoint();
const wss = new WebsocketServer(entrypoint);

// const boards = new Boards(entrypoint);
// const workers = new Workers(entrypoint, wss);

entrypoint.start();
