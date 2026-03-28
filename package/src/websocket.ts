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
        // console.log('useWebsocket/emit', ws, loading, error)
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
