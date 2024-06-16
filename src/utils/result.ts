/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
export type UsecaseResult<T, E extends Error | null> = Ok<T> | Err<E>;

type Ok<T> = {
    readonly status: "ok";
    readonly val: T;
    readonly err: null;
};

type Err<E extends Error | null> = {
    readonly status: "err";
    readonly val: null;
    readonly err: E;
};

export const UsecaseResultOk = <T>(val: T): Ok<T> => ({
    status: "ok",
    val,
    err: null,
});

export const UsecaseResultError = <E extends Error | null>(err: E): Err<E> => ({
    status: "err",
    val: null,
    err,
});

export type UsecaseMethod = (
    ...args: any[]
) => UsecaseResult<unknown, Error | null> | Promise<UsecaseResult<unknown, Error | null>>;
