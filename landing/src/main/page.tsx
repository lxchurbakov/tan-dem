import React from 'react';

import { useCursors } from 'package/src/index';
import { Absolute, Base, Card, Clickable, Container, Flex, Text } from 'landing/lib/atoms';

import { debounce, Point, useName } from './utils';
import { FancyBackground } from './fancy-background';

const Cursor = () => (
    <svg width="40" height="30" viewBox="0 0 80 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.12936 3.4827C1.69443 2.67406 2.48828 1.75603 3.35144 2.06917L76.9291 28.7612C77.8186 29.0843 77.8031 30.3485 76.9059 30.6497L49.5244 39.8322C47.7933 40.4127 46.5163 41.8907 46.193 43.6877L41.0806 72.1116C40.913 73.0434 39.6641 73.2423 39.2153 72.4089L2.12936 3.4827Z" fill="url(#paint0_linear_186_68)" stroke="white" stroke-width="4"/>

        <defs>
            <linearGradient id="paint0_linear_186_68" x1="-8.04888" y1="28.1758" x2="72.286" y2="53.4164" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6394E9"/>
                <stop offset="1" stop-color="#185ED7"/>
            </linearGradient>
        </defs>
    </svg>
);

export const MainPage = () => {
    const name = useName();
    const { update, cursors } = useCursors<Point & { name: string }>();
   
    React.useEffect(() => {
        const mousemove = debounce(({ pageX, pageY }) => {
            update({ x: pageX, y: pageY, name })
        }, 20);

        window.addEventListener('mousemove', mousemove);
        return () => window.removeEventListener('mousemove', mousemove);
    }, [update]);

    return (
        <Container>
            <FancyBackground />
            <Flex mb="256px" p="24px 0" justify="flex-start" gap="36px">
                <Text weight="800">@lxch/tandem</Text>

                {/* <Clickable>
                    <Text weight="400">article on dev.to</Text>
                </Clickable> */}

                <Clickable>
                    <Text weight="400">docs</Text>
                </Clickable>

                {/* <Clickable>
                    <Text weight="400">examples</Text>
                </Clickable>

                <Clickable>
                    <Text weight="400">author</Text>
                </Clickable> */}
            </Flex>

            {Object.entries(cursors).map(([clientId, { name, ...position }]) => (
                <Absolute key={clientId} top={position.y} left={position.x} style={{ transition: 'all .2s ease' }}>
                    <Cursor />

                    <Card p="4px 6px" radius="12px" background="#447de2">
                        <Text size="14px">{name}</Text>
                    </Card>
                    
                </Absolute>
            ))}

            <Base mb="256px">
                <Text size="52px" weight="800" mb="24px">Make it work like Miro</Text>
                
                <Text size="32px" weight="400" mw="650px" mb="48px">
                    Turn your application into powerful collaborative tool with 20 lines of code.
                    {/* {+ MIRO animated (Miro / Figma / GDocs) + gradient} */}
                    {/* + links bottom highlight */}
                </Text>

                <Flex justify="flex-start" gap="24px">
                    <Clickable p="12px 18px" radius="8px" background="#a738f3">
                        <Text weight="600" size="21px">Get started</Text>
                        {/* + get started scrolls to last section */}
                    </Clickable>

                    <Clickable>
                        <Text>Read an article</Text>
                    </Clickable>
                </Flex>
            </Base>

            {/* cursors */}
            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Let your users see each other</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Display users' cursors, names, carets, selections and even more. + cards with different types of cursors and playfround for each
                    + here the section with how many users on website
                    + grid with different types of cursors - arrow + name / text + selection / pocket on the grid
                </Text>
            </Base>

            {/* actions & locks */}
            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Collaborate with Actions & Locks</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Let your users collaborate without disturbance with Actions & Locks mechanism.
                    + maybe a checklist with inner state + locks
                    + FAQ needs to be here as well
                        + do I need to integrate it on server side?
                            + no you only show the changes - like a for-show copy
                        + how do I know the state is consistent
                            + this mechanism does not guarantee consistency between server and client, but reducer does
                </Text>
            </Base>

            {/* actions & locks */}
            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Use shared state with useServerReducer</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Let your users work on the same state with useServerReducer
                    + here is the chessboard
                    + here is a little FAQ
                        + where is state stored?
                            + in S3
                        + does it guarantee consistency?
                            + yes
                </Text>
            </Base>

            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Comment everything</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Use our Comments plugin to let your users comment everything in real-time. 
                    + I want an illustration and on every image you can comment
                    + here is a little FAQ
                        + where is it stored?
                            + by default tandem server uses S3, but you can tweak it to use anything you like
                </Text>
            </Base>

            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Discover our library of plugins</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    We have many more plugins for any usecase
                    + Timer, Voting, Chat, Calls, authentication - cards list grid with links to docs
                </Text>
            </Base>

            <Base mb="256px">
                <Text size="32px" weight="800" mb="24px">Use your own server for privacy</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Take our docker image and use it to host you user's data or build your image from our code.
                    + code to start docker container
                    + or simply checkout our server and make it your own code - we don't mind
                </Text>
            </Base>

            <Base mb="256px">
                <Text size="    32px" weight="800" mb="24px">Start with just 20 lines of code</Text>
                
                <Text size="22px" weight="400" mw="650px" mb="48px">
                    Code example + button to copy + npm command separately
                    + link to github + link to author
                </Text>
            </Base>

            <Text>footer</Text>
        </Container>
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