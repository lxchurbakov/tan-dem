import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from "react-router-dom";
// import Readme from './readme';
// import S3Page from './examples/s3/page';
// import PostgresPage from './examples/postgres/page';
// import RedisPage from './examples/redis/page';
import * as theme from 'landing/lib/theme';

// import { TypeScriptFeaturesPage } from './ts-features/page';
// import { DragAndDropPage } from './drag-n-drop/page';

// import { RxJsDebugPage } from './rxjs-debug/page';

import { MainPage } from './main/page';

// import { helmet as speakhubHelmet } from './speakhub';
// import Router from './router';

export default () => {
    return (
        <>
            <Helmet>
                {theme.helmet}
                {/* {speakhubHelmet} */}
                <title>A/B Remix</title>
                <style>{`body { margin: 0; background: #121212; padding: 0; font-family: ${theme.font.family}; }`}</style>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
       
            <Routes>
                <Route path="/" element={<MainPage />} />
                {/* <Route path="/articles/ts-features" element={<TypeScriptFeaturesPage />} /> */}
                {/* <Route path="/articles/drag-and-drop" element={<DragAndDropPage />} /> */}
                {/* <Route path="/sandbox/midi-keyboard" element={<MidiKeyboardPage />} /> */}
                {/* <Route path="/sandbox/rxjs" element={<RxJsDebugPage />} /> */}
                {/* <Route path="/projects/music" element={<MusicPage />} /> */}
                {/* <Route path="/projects/rxboards" element={<RBPage />} /> */}
                {/* <Route path="/projects/trader" element={<TraderPage />} /> */}
                {/* <Route path="/projects/boards" element={<BoardsDashboardPage />} /> */}
                {/* <Route path="/projects/boards/:boardId" element={<BoardsBoardPage />} /> */}
                {/* <Route path="/projects/fit/boards/:boardId" element={<FitBoardPage />} /> */}
                {/* <Route path="/projects/speakhub" element={<SpeakHubPage />} /> */}
                {/* <Route path="/projects/pascal" element={<PascalPyramidPage />} /> */}
                
                {/* <Route path='/' element={<Readme />} />
    
                <Route path='/examples/s3' element={<S3Page />} />
                <Route path='/examples/postgres' element={<PostgresPage />} />
                <Route path='/examples/redis' element={<RedisPage />} /> */}
                
                <Route path='*' element={<div>404 not found</div>} />
            </Routes>
        </>
    );
};
