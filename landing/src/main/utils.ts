import React from 'react';
import { useLocalStorage } from 'package/lib/hooks';

export const debounce = (p, t) => {
    let k = null as any;

    return (...args) => {
        if (k) {
            clearTimeout(k);
        }

        k = setTimeout(() => p(...args), t);
    };
};

export type Point = { x: number, y: number };

const rand = (a: number, b: number) =>
    Math.floor(Math.random() * (b - a) + a);

const randomOf = <T,>(c: T[]) =>
    c[rand(0, c.length)];

const ADJECTIVES = ['beautiful', 'cool', 'emotional', 'funky', 'funny', 'awesome'];
const NOUNS = ['pine', 'oak', 'panda', 'fox', 'wolf', 'bear'];

const capitalize = (s: string) => [s[0]?.toUpperCase() ?? '', s.substr(1)].join('');

const randomName = () => {
    return capitalize([
        randomOf(ADJECTIVES),
        randomOf(NOUNS)
    ].join(' '));
};

export const useName = () => {
    const [name] = React.useState(randomName()); // useLocalStorage('name', )

    return name;
};
