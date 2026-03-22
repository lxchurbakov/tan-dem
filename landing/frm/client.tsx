import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Application from 'landing/src/index';

import { Forth, ForthCache } from 'landing/lib/use-forth';

const app = document.getElementById('app');

if (!app) {
    throw new Error('no app found');
}

const cacheNode = document.getElementById('storage');

if (!cacheNode) {
    throw new Error(`no cache node found`);
}

hydrateRoot(app, (
    <BrowserRouter>
        <Forth mode="client" cache={ForthCache.parse(cacheNode.innerText)}>
            <Application />
        </Forth>
    </BrowserRouter>
));
