# Add collaborative work to your application

Ever wondered what would it take to turn your application into Miro-like collaborative tool? Let's see how it's done and 
+ finish that
+ add info about library

+ My introduction comes here

## Architecture

+ Websocket server
+ pub sub / queue
+ Rooms
+ You can simply start this docker container

## Cursors

User cursor represent any information that is required to describe this user's state. That can be { x, y } position on the screen, { row, col } caret in the document, user's name and whatever else you'd like to see there.

+ screenshot examples

+ code example how to do this
+ code example with @lxch/tandem

## Actions

Now that you see other users' cursors, you can share their actions. That means you'd send whatever this user is doing to your application to the same websocket queue. After you receive that message you update state accordingly. 

However not every action on your website has to become collaborative. + expand that

+ code example
+ video example of inputs

## Locks

Once you have collaborative actions you immediately hit an issue with concurrency. To fix that you'd need some kind of transaction mechanism. The easiest and very much robust option would be to do what Miro did - lock parts of your UI and not let other people iteract with it until it's released.

+ screenshot of locks

+ code example with tandem and bare
+ server example

Also we have to drop locks once user is gone

## Shared state

+ sometimes it's easier to keep state on the server
+ code example with reducer
+ this is actually harder and easier at the same time to make yourself

## About @lxch/tandem

+ Many other featurs in @lxch/tandem - tandem, voting, chat, webrtc calls, server reducer
