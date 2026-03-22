import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

import { EventEmitter } from 'server/lib/events';

import Entrypoint from './entrypoint';

export type WebSocket = any;

export default class {
    private wss: WebSocketServer;
    private clients = new Map<string, WebSocket>();

    public onMessage = new EventEmitter<{ clientId: string, data: any }>();
    public onConnect = new EventEmitter<{ clientId: string }>();
    public onDisconnect = new EventEmitter<{ clientId: string }>();

    private subscriptions = new Map();;

    constructor (private entrypoint: Entrypoint) {
        this.wss = new WebSocketServer({ server: this.entrypoint.server });

        this.wss.on('connection', (ws: WebSocket) => {
            const clientId = uuid();

            this.clients.set(clientId, ws);

            ws.on('close', () => {
                this.clients.delete(clientId);
                this.onDisconnect.emitps({ clientId });
            });

            ws.on('message', (data) => {
                this.onMessage.emitps({
                    clientId,
                    data: JSON.parse(data),
                });
            });

            this.onConnect.emitps({ clientId });
        });
    }

    public send = (clientId: string, data: any) => {
        const ws = this.clients.get(clientId);

        if (!ws) {
            throw new Error(`Cannot send data to ${clientId}`);
        }

        ws.send(JSON.stringify(data));
    };

    public broadcast = (data: any) => {
        this.clients.forEach((ws) => {
            ws.send(JSON.stringify(data));
        });
    };
};

 // PUB SUB EMIT
// this.onMessage.on(({ clientId, data }) => {
//     this.broadcast({ clientId, data });
//     // TODO exclude the guy who sent the message
// //      this.clients.forEach((ws) => {
// //     ws.send(JSON.stringify(data));
// // });
// });

// this.wss = new WebSocketServer({ noServer: true });

// this.entrypoint.server.on('upgrade', (req, socket, head) => {
//     console.log(req.headers);
//     this.wss.handleUpgrade(req, socket, head, (ws) => {
//         this.wss.emit('connection', ws);
//     });
// });

// this.wss.on('ready', () => {
//     console.log('WS Server is up at 90001');
// });


// public onSubMessage = new EventEmitter<any>();

// public sendSubMessage = (subscriptionId, data) => {
//     const { clientId } = this.subscriptions.get(subscriptionId);

//     this.send(clientId, {
//         type: 'sub/message',
//         data: data,
//     });
// };

// public onBoardMessage = new EventEmitter<any>();

// public sendBoardMessage = (boardId, data) => {
//     console.log('send', boardId, this.subscriptions);

//     Array.from(this.subscriptions.keys()).forEach((subscriptionId) => {
//         // console.log({subscriptionId})
//         const subscription = this.subscriptions.get(subscriptionId);

//         if (subscription.boardId === boardId) {
//             this.sendSubMessage(subscriptionId, data);
//             // this.send(subscription.clientId)
//         }
//     });

//     // for (let subscriptionId of ) {

//     // }
// };

// this.onConnect.on(({ clientId }) => {
//     this.send(clientId, 'Hi fella');
// });

// Subscription stuff
// this.

// this.onMessage.on(({ clientId, data }) => {
//     if (data?.type === 'sub/setup') {
//         const subscriptionId = uuid();
//         const boardId = data?.boardId;

//         this.subscriptions.set(subscriptionId, { clientId, boardId });
//         this.send(clientId, { type: 'sub/setup/resolve', subscriptionId });
//     }
// });

//         this.onMessage.on(({ clientId, data }) => {
//             if (data?.type === 'sub/message') {
//                 // const { subscriptionId } = data;
//                 // console.log(data);
//                 this.onSubMessage.emitps({ subscriptionId: data.subscriptionId, data: data.data });

                

//                 const subscription = this.subscriptions.get(data.subscriptionId);
// // 
//                 // console.log('receive shiet', data, subscription)

//                 if (subscription?.boardId) {
//                     this.onBoardMessage.emitps({ boardId: subscription?.boardId, data: data.data });
//                 }
//                 // const subscriptionId = uuid();
//                 // const boardId = data?.boardId;

//                 // subscriptions.set(subscriptionId, boardId);
//                 // this.send(clientId, { type: 'sub/setup/resolve', subscriptionId });
//             }
//         });
