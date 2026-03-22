# tan-dem

The easiest way to bring collaborative work to your application.

+ gif comes here
+ landing page comes here

## Installation

+ `npm i -S @lxch/tan-dem`
+ `const HOST = {PUBLIC_HOST}`
+ `<TandemProvider url={HOST} room={ROOM_NAME}>{...your app...}</TandemProvider>`

+ need Vue, Svelte and Angular

## Server

+ `docker start @lxch/tan-dem-server`
+ about rooms
+

## Cursors

+ different types of cursors (pointer, caret, anything else?)

```jsx
// connect
const { cursors, push } = useCursors<{ x: number, y: number }>();

// push current user info
React.useEffect(() => {
    const updateCursor = (e) => {
        push({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
}, [push]);

// TODO color? name? push it all
return (
    <Relative>
        {cursors.map((cursor: { x: number, y: number, color: string }) => {
            return (
                <Absolute left={x} top={y}>
                    <CursorIcon color={color} />
                </Absolute>
            );
        })}
    </Relative>
);
```

## Actions

+ when someone changes something of significance within your app
+ you push an action
+ more granular updates?

```jsx
const App = () => {
    const [value, setValue] = React.useState('');

    const { push, on } = useAction<string>('update_value');

    // TODO can we merge it
    // can we leave both options? so no roundtrip
    React.useEffect(() => {
        return on((data) => {
            setValue(data);
        });
    }, [on]);

    const updateAndSetValue = React.useCallback((s: string) => {
        push(s);
        setValue(s);
    }, []);

    return (
        <Input value={value} onChange={updateAndSetValue} />
    );
};
```

## Locks

+ sometimes you need to lock stuff just like in miro

```jsx
const { locked, lock, unlock } = useLock('main_input');

return (
    {/* locked.cursor will contain user information that you have pushed before */}
    <Disabled disabled={locked}>
        <Input ref={useClickOutside(unlock)} onClick={lock} value={value} onChange={updateAndSetValue} />
    </Disabled>
);
```

## Chat

+ simply separate component that 
+ chat is pub sub (fan), so no storage

## Calls

+ another components to just hop on a call

## Comments

+ Comments need to be pricey? since it requires storage
+ need a "connector" docker env variable for storage (postgres/mongo?)
+ a bit of rabbit hole, need to simplify yet keep usable
+ Figma-like component

## Other components

+ Timer (state on the server)
+ Voting

## Custom Server Reducer

Timer and voting are built upon a `Server Reducer` module. This module gives you tooling to create your own state on server side and keep it in sync for all your clients. You can use it yourself and create custom state like: 

+ Just like chat you can have custom components that will keep their state on the server
+ pretty much like dispatch
+ there things also require storage so need to be premium or something

```jsx
const { state, dispatch } = useServerReducer('counter', (action, state) => {
    if (action.type === 'increment') {r
        return { counter: state.counter + 1 };
    }

    return state;
}, { counter: 0 });

return (
    <Counter count={state.counter} onClick={() => dispatch({ type: 'increment' })} />
);
```

## Using with AI

+ need some kind of agents.md to make it easier for Cursor

## Support

+ do not hesitate creating any issues
+ if you want premium go here (open collective link)

## Other

+ library for server support?
