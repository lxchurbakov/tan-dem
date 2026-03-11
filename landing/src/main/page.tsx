import React from 'react';
import { useCursors } from 'package/dist';

import { useWebsocket } from 'package/src/websocket';

/*
const useWSChannel = () => {
    // ???
};

const usePubSub = (channelName) => {
    const { emit, on } = useWSStatelessChannel(channelName);
};

const useServerState = (name: string) => {
    const { emit, on } = useWSStatefulChannel(channelName);

    // on connect should send state
    // we can send patches there
    return { state, patch };
};

const useServerReducer = (func) => {
    const { state, patch } = useServerState('...');


};

const useCursors = <T>() => {
    const id = React.useId(); // TODO think through, maybe local storage or in args?
    const { pub, sub } = usePubSub('__cursors');

    const push = (data: T) => {
        return pub({ id, data });
    }; // todo usecallback + debounce

    const [cursors, setCursors] = React.useState([]);

    React.useEffect(() => {
        return sub(({ id, data }: { id: string, data: T }) => {
            setCursors(($) => $.map((cursor) => {
                if (cursor.id === id) {
                    return data;
                } else {
                    return cursor;    
                }
            }));
        });
    }, [sub]);

    return { push, cursors };
};

*/

// TODO use library here
//

export const MainPage = () => {
    const { push, cursors } = useCursors();
    const [value, setValue] = React.useState(0);

    // console.log({ push, cursors });

    // console.log()
    // const { on, emit } = useWebsocket('ws://localhost:9000');

    // React.use

    return (
        <div onClick={() => setValue(Math.random())}>It works! {value}</div>
    );
};

// ```jsx
// // connect
// const { cursors, push } = useCursors<{ x: number, y: number }>();

// // push current user info
// React.useEffect(() => {
//     const updateCursor = (e) => {
//         push({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', updateCursor);
//     return () => window.removeEventListener('mousemove', updateCursor);
// }, [push]);

// // TODO color? name? push it all
// return (
//     <Relative>
//         {cursors.map((cursor: { x: number, y: number, color: string }) => {
//             return (
//                 <Absolute left={x} top={y}>
//                     <CursorIcon color={color} />
//                 </Absolute>
//             );
//         })}
//     </Relative>
// );
// ```