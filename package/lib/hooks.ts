import React from 'react';

import { Predicate } from '../types';

export const useLocalStorage = <T,>(key: string, def: T) => {
    const [value, setValue] = React.useState(JSON.parse(localStorage.getItem(key) || JSON.stringify(def)) as T);

    React.useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);

    return [value, setValue] as const;
};

export const useField = ([value, onChange]: any, name, def) => {
    return [
        React.useMemo(() => value[name] || def, [value, name, def]),
        React.useCallback(($) => onChange({ ...value, [name]: $ }), [value, onChange]),
    ];
};

export const useArrayField = ([value, onChange], index, def) => {
    return [
        React.useMemo(() => value[index] || def, [value, index, def]),
        React.useCallback(($) => onChange(value.map(($$, $index) => $index === index ? $ : $$)), [index, value, onChange]),
    ];
};

export const useAsyncMemo = <T,>(predicate: Predicate<[], Promise<T>>, deps: React.DependencyList, defLoading = false) => {
    const [loading, setLoading] = React.useState(defLoading);
    const [value, setValue] = React.useState(null as T | null);
    const [error, setError] = React.useState(null as Error | null);

    React.useEffect(() => {
        setLoading(true);

        predicate().then((value) => {
            setValue(value);
        }).catch((error) => {
            setError(error);
        }).then(() => {
            setLoading(false);
        });
    }, deps);

    return [value, loading, error] as const;
};

export const useDebouncedCallback = (predicate, time, deps) => {
    const timeoutRef = React.useRef(null as NodeJS.Timeout | null);

    return React.useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            predicate(...args);
        }, time);
    }, deps);
};

export const useListener = (object, event, handler, deps) => {
    React.useEffect(() => {
        object.addEventListener(event, handler);
        return () => object.removeEventListener(event, handler);
    }, deps);
};

export const useToggle = (def = false) => {
    const [value, setValue] = React.useState(def);
    const show = React.useCallback(() => setValue(true), [setValue]);
    const hide = React.useCallback(() => setValue(false), [setValue]);
    const toggle = React.useCallback(() => setValue($ => !$), [setValue]);

    return { value, setValue, show, hide, toggle };
};  

// Just 2 stupid hooks I use to hack through 
// the bugs of updated / not updated stuff
export const useForceUpdate = ([_, setState] = React.useState(true)) => 
    () => setState((v) => !v);

export const useTicker = ([state, setState] = React.useState(1)) => 
    React.useMemo(() => ({ state, update: () => setState($ => $ + 1) }), [state]);

export const useDebouncedEffect = (predicate, deps, time) => {
    React.useEffect(() => {
        let k = setTimeout(() => {
            predicate();
        }, time);

        return () => {
            clearTimeout(k);
        };
    }, deps);
};

export const useFresh = <T,>(value: T) => {
    const ref = React.useRef(value);
    ref.current = value;
    return ref;
};

export const usePeriodicTicker = (time: number) => {
    const ticker = useTicker();

    React.useEffect(() => {
        setInterval(() => {
            ticker.update();
        }, time);
    }, []);

    return ticker;
};
