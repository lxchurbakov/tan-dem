import React from 'react';

import { useThread } from './thread';

export const useCursors = <T,>() => {
    const { emit, on } = useThread('__cursors');
    const [self] = React.useState(Math.random().toString());

    const [cursors, setCursors] = React.useState({} as Record<string, T>);

    const update = React.useCallback((cursor: T) => {
        emit({ id: self, cursor });
    }, [emit]);

    React.useEffect(() => {
        return on(({ id, cursor }: { id: string, cursor: T }) => {
            if (id !== self) {
                setCursors(($) => ({ ...$, [id]: { ...$[id], ...cursor } }));
            }
        });
    }, [on]);

    return { cursors, update };
};
