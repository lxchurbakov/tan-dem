// import { Id } from './utils';

export type Id = string;

export type Predicate<A extends any[], R = any> = (...args: A) => R;
export type ArgumentsOf<T> = T extends Predicate<infer A, any> ? A : never;

export type MongoEntity<T> = T & { _id: Id };
// export type User = Entity<{ name: string, login: string, avatarUrl: string }>;

export type Board = MongoEntity<{ name: string }>;

export type Value<T> = { value: T, onChange: ($: T) => void };
