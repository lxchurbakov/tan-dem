import React from 'react';

import { useTandemContext } from './context';
import { useWebsocket } from './websocket';

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
            // console.log('thread/emit', data)
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
    }, [ws]);

    return { emit, on };
};
