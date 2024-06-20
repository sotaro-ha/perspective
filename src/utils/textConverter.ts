import { breakChar } from "./consts";

export const convertText = (value: string) => {
    return value.split(breakChar);
};
