/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
export type Result<T, E extends Error | null> = Ok<T> | Err<E>;

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

export const ResultOk = <T>(val: T): Ok<T> => ({
    status: "ok",
    val,
    err: null,
});

export const ResultError = <E extends Error | null>(err: E): Err<E> => ({
    status: "err",
    val: null,
    err,
});

export type ResultMethod = (
    ...args: any[]
) => Result<unknown, Error | null> | Promise<Result<unknown, Error | null>>;
