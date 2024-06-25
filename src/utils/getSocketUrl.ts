import { guardUndef } from "./guardUndef";

export const getSocketUrl = () => {
    const socketUrl =
        (process.env.NEXT_PUBLIC_ENV === "local"
            ? guardUndef(process.env.NEXT_PUBLIC_HOST_LOCAL)
            : guardUndef(process.env.NEXT_PUBLIC_HOST_DEV)) +
        guardUndef(process.env.NEXT_PUBLIC_SOCKET_PORT);

    return socketUrl;
};
