import React from 'react';

const __TandemContext = React.createContext({} as { room: string });
// const useRoom = () => React.useContext(TandemContext);

export const TandemContext = ({ children, room }: React.PropsWithChildren<{ room: string }>) => {
    return (
        <__TandemContext.Provider value={{ room }}>
            {children}
        </__TandemContext.Provider>
    );
};

const useTandemContext = () => {
    return React.useContext(__TandemContext)
};

const useThread = (thread: string) => {
    // here we connect to WS server
    // and subscibe to pub sub thread
};

export const useCursors = <T,>() => {
    const { room } = useTandemContext();
    const thread = useThread(`${room}/__cursors`);
    const cursors = React.useState([] as T[]);

    React.useEffect(() => {
        // here we subscribe and update
    }, []);

    const push = React.useCallback((data: T) => {
        // send data to room/cursors thread?
    }, []);

    return { cursors, push };
};
