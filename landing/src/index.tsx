import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from "react-router-dom";

import * as theme from 'landing/lib/theme';

import { MainPage } from './main/page';
import { TandemProvider } from 'package/src';

export default () => {
    return (
        <TandemProvider url="ws://localhost:9000">
            <Helmet>
                {theme.helmet}
                {/* {speakhubHelmet} */}
                <title>Tandem</title>
                <style>{`body { margin: 0; background: #121212; padding: 0; font-family: ${theme.font.family}; }`}</style>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
       
            <Routes>
                <Route path="/" element={<MainPage />} />                
                <Route path='*' element={<div>404 not found</div>} />
            </Routes>
        </TandemProvider>
    );
};
