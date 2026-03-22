import React from 'react';

import { useAsyncMemo } from 'package/lib/hooks';

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

// import React from 'react';
// import { useBetween } from 'use-between';

// import { useAsyncMemo } from 'package/lib/hooks';

// export const createWebSocket = (url: string) => {
//     return new Promise((resolve, reject) => {
//         let listeners = [] as any[];
        
//         const ws = new WebSocket(url);

//         const on = ($) => {
//             listeners.push($);
//             return () => {
//                 listeners = listeners.filter(($$) => $ !== $$);
//             };
//         };

//         const emit = (data) => {
//             ws.send(JSON.stringify(data));
//         };

//         ws.onopen = () => {
//             resolve({ on, emit });
//         };    

//         ws.onmessage = (e) => {
//             listeners.forEach(($) => $(JSON.parse(e.data)));
//         };

//         ws.onerror = (e) => {
//             console.error(e);
//             console.log('no reconnection');
//             reject(e);
//         };
//     });   
// };

// export const useWebsocket = (url: string) => {
//     const [ws, loading, error] = useAsyncMemo<any>(() => createWebSocket(url), []);

//     // console.log({ ws, loading, error })

//     return { ws, loading, error };
// };

// export const useWebsocketConnection = (url: string) => {
//     const { ws, loading, error } = useWebsocket(url);

//     React.useEffect(() => {
//         if (error) {
//             throw new Error(`cant establish ws connection to ${url}`);
//         }
//     }, [error]);

//     const emitRef = React.useRef(null as any);

//     const emit = React.useCallback((data, ttl = 10) => {
//         if (ttl < 0) {
//             throw new Error(`cant send messages to ws connection to ${url} after 10 retries`);
//         }

//         if (error) {
//             throw new Error(`cant send messages to ws connection to ${url} - error ${error}`);
//         }

//         if (loading || !ws) {
//             return setTimeout(() => emitRef.current?.(data, ttl - 1), 100);
//         }

//         // if (!ws) {
//         //     throw new Error(`cant send messages to ws connection to ${url} - no ws`);
//         // }

//         ws.emit(data);
//     }, [ws, loading]);

//     emitRef.current = emit;

//     const on = React.useCallback((predicate, ttl = 10) => {
//         if (ttl < 0) {
//             throw new Error(`cant listen to messages on ws connection to ${url} after 10 retries`);
//         }

//         if (error) {
//             throw new Error(`cant listen to messages on ws connection to ${url} - error`);
//         }

//         if (loading || !ws) {
//             return setTimeout(() => emit(predicate, ttl - 1), 100);
//         }

//         // if (!ws) {
//         //     throw new Error(`cant listen to messages on ws connection to ${url} - no ws`);
//         // }

//         ws.on(predicate);
//     }, [ws, loading]);

//     // const on = React.useCallback((predicate) => {
//     //     if (loading) {
//     //         console
//     //     }
//     // }, [ws, loading, error]);

//     return { on, emit };
// };

// // export const useChannel = () => {
// //     const boardId = useBoardId();
// //     const { ws, error } = useWebsocket();
// //     // const [loading, setLoading] = React.useState(true);
// //     const [subscriptionId, setSubscriptionId] = React.useState(null);

// //     React.useEffect(() => {
// //         if (ws) {
// //             const dispose = ws.on((data) => {
// //                 if (data.type === 'sub/setup/resolve') {
// //                     // const { subscriptionId } = data;
// //                     // setLoading(false);
// //                     setSubscriptionId(data.subscriptionId);
// //                 }
// //             });

// //             ws.emit({ type: 'sub/setup', boardId });

// //             return dispose;
// //         }
// //     }, [ws]);

// //     const emit = React.useCallback((data) => {
// //         console.log('emit shiet', subscriptionId)
// //         return ws?.emit({ type: 'sub/message', data, subscriptionId });
// //     }, [ws, subscriptionId]);

// //     const on = React.useCallback((listener) => {
// //         return ws?.on((data) => {
// //             if (data.type === 'sub/message') {
// //                 listener(data.data);
// //             }
// //         });
// //     }, [ws]);

// //     return React.useMemo(() => ({ emit, on, loading: subscriptionId === null, error }), [on, emit, subscriptionId]);
// // };

// // const useBoardId = () => {
// //     // console.log(window.location);
// //     return window.location.pathname.substr(8);
// // };

// // const _useBus = () => {
// //     const listenersRef = React.useRef([]);
// //     const channel = useChannel();

// //     const on = React.useCallback((listener) => {
// //         listenersRef.current.push(listener);
// //         const wtf = channel?.on?.(listener);

// //         return () => {
// //             wtf?.();
// //             listenersRef.current = listenersRef.current.filter(($) => $ !== listener);
// //         };
// //     }, [channel]);

// //     const emit = React.useCallback((data) => {
// //         // console.log('emit', data)
// //         listenersRef.current.forEach(($) => $(data));
// //         channel?.emit?.(data);
// //     }, [channel]);

// //     return React.useMemo(() => ({ on, emit, loading: channel.loading, error: channel.error }), [on, emit, channel]);
// // };

// // export const useBus = () => useBetween(_useBus);

// // export const useNamed = (bus) => {  
// //     const on = React.useCallback((name, listener) => {
// //         return bus.on((data) => {
// //             if (data.name === name || name === '*') {
// //                 listener(data.data);
// //             }
// //         });
// //     }, [bus]);

// //     const emit = React.useCallback((name, data) => {
// //         return bus.emit({ name, data });
// //     }, [bus]);

// //     return React.useMemo(() => ({
// //         ...bus, on, emit
// //     }), [bus, on, emit]);
// // };
