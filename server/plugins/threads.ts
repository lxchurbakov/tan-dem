import WebsocketServer from "./websocket-server";

const threads = (() => {
    const subscribers = new Map<string, string[]>();

    const add = (threadId: string, clientId: string) => {
        const subs = subscribers.get(threadId) ?? [];

        return subscribers.set(threadId, [...subs, clientId]);
    };

    const remove = (threadId: string, clientId: string) => {
        const subs = subscribers.get(threadId) ?? [];

        return subscribers.set(threadId, subs.filter(($) => $ !== clientId));
    };

    const dismantle = (clientId: string) => {
        for (let threadId in subscribers) {
            remove(threadId, clientId);
        }
    };

    const list = (threadId: string) => {
        return subscribers.get(threadId) ?? [];
    };

    return { add, remove, dismantle, list };
})();

export default class {
    constructor (private wss: WebsocketServer) {
        //
        // Subscribing and unsubscribing from thread
        //
        this.wss.onMessage.on(({ clientId, data }) => {
            if (data?.type === 'thread/subscribe') {
                const { name } = data;

                threads.add(name, clientId);
            }

            if (data?.type === 'thread/unsubscribe') {
                const { name } = data;

                threads.remove(name, clientId);
            }
        });

        this.wss.onDisconnect.on(({ clientId }) => {
            threads.dismantle(clientId);
        });

        // Dispatching messages in thread
        // (basically resending them)
        this.wss.onMessage.on(({ clientId, data }) => {
            if (data?.type === 'thread/message') {
                const { message, threadId } = data;
                
                for (let recepientClientId of threads.list(threadId)) {
                    try {
                        this.wss.send(recepientClientId, { type: 'thread/message', threadId, clientId, message });
                    } catch (e) {
                        // ????
                        console.error(`cannot send message to ${recepientClientId}`);
                    }
                }
            }
        });
    }
};
