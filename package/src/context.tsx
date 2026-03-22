import React from 'react';

const TandemContext = React.createContext({ url: null } as any);

export const TandemProvider = ({ children, url }) => {
    return (
        <TandemContext.Provider value={{ url }}>
            {children}
        </TandemContext.Provider>
    );
};

export const useTandemContext = () => React.useContext(TandemContext);
