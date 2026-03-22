import { useAsyncMemo } from 'package/lib/hooks';
import React from 'react';

// useWebsocket
// useThread
// threadId provider (room)
// useCursors

//
//
//
export const createWebSocket = (url: string) => {
    return new Promise<{ on: (listener: (data: unknown) => void) => void, emit: (data: unknown) => void }>((resolve, reject) => {
        let listeners = [] as any[];
        
        const ws = new WebSocket(url);

        const on = ($) => {
            listeners.push($);
            return () => {
                listeners = listeners.filter(($$) => $ !== $$);
            };
        };

        const emit = (data) => {
            ws.send(JSON.stringify(data));
        };

        ws.onopen = () => {
            resolve({ on, emit });
        };    

        ws.onmessage = (e) => {
            listeners.forEach(($) => $(JSON.parse(e.data)));
        };

        ws.onerror = (e) => {
            console.error(e);
            console.log('no reconnection');
            reject(e);
        };
    });   
};

//
//
//
export const useWebsocket = (url: string) => {
    const [ws, loading, error] = useAsyncMemo(() => createWebSocket(url), [url]);

    const emit = React.useCallback((data: unknown) => {
        console.log('useWebsocket/emit', ws, loading, error)
        // for now we skip, but need a queue
        if (!ws) {
            return;
        }

        return ws.emit(data);
    }, [ws]);

    const on = React.useCallback((listener: (data: unknown) => void) => {
        // for now we skip, but need a queue
        if (!ws) {
            return;
        }

        return ws.on(listener);
    }, [ws]);

    const state = React.useMemo(() => {
        if (error) {
            return 'error';
        }

        if (loading) {
            return 'loading';
        }

        return 'idle';
    }, [loading, error]);

    return React.useMemo(() => ({ emit, on, state }), [emit, on, state]);
};

//
// Context related stuff
//
const TandemContext = React.createContext({ url: null } as any);

export const TandemProvider = ({ children, url }) => {
    return (
        <TandemContext.Provider value={{ url }}>
            {children}
        </TandemContext.Provider>
    );
};

const useTandemContext = () => React.useContext(TandemContext);

//
//
//
export const useThread = (name: string) => {
    const { url } = useTandemContext();
    const ws = useWebsocket(url);

    React.useEffect(() => {
        if (ws.state === 'idle') {
            ws.emit({ type: 'thread/subscribe', name });

            return () => {
                ws.emit({ type: 'thread/unsubscribe', name });
            };
        }
    }, [ws.state]);

    const emit = React.useCallback((data: unknown) => {
        if (ws.state === 'idle') {
            console.log('thread/emit', data)
            ws.emit({ type: 'thread/message', threadId: name, message: data });
        }
    }, [ws]);

    const on = React.useCallback((listener: (data: unknown) => void) => {
        if (ws.state === 'idle') {
            ws.on((event: any) => {
                if (event?.type === 'thread/message') {
                    const { clientId, threadId, message } = event;

                    if (threadId === name) {
                        listener(message);
                    }
                }
            });
        }
        //  let unsub = ws.on((event) => {
                
        //         // return () => {

        //         // };
        //     });

    }, [ws]);

    return { emit, on };
};

//
//
//
export const useCursors = <T,>() => {
    const { emit, on } = useThread('__cursors');
    const [self] = React.useState(Math.random().toString());

    const [cursors, setCursors] = React.useState({} as Record<string, T>);

    const update = React.useCallback((cursor: T) => {
        // console.log('emit', id, cursor);
        emit({ id: self, cursor });
    }, [emit]);

    React.useEffect(() => {
        return on(({ id, cursor }: { id: string, cursor: T }) => {
            // console.log('on', id, cursor)
            if (id !== self) {
                setCursors(($) => ({ ...$, [id]: cursor }));
            }
        });
    }, [on]);

    return { cursors, update };
};


        // this.wss.onDisconnect.on(({ clientId }) => {
        //     threads.dismantle(clientId);
        // });

        // Dispatching messages in thread
        // (basically resending them)
        // this.wss.onMessage.on(({ clientId, data }) => {
        //     if (data?.type === 'thread/message') {
        //         const { message, threadId } = data;
                
        //         for (let recepientClientId of threads.list(threadId)) {
        //             this.wss.send(recepientClientId, { type: 'thread/message', clientId, message });
        //         }
        //     }
        // });