import { atom, useAtom } from "jotai";
import io, { Socket } from "socket.io-client";

import { getSocketUrl } from "@/utils";

const socketUrl = getSocketUrl();
const defaultSocket = io(socketUrl);
const socketAtom = atom(defaultSocket);

export const useSocket = () => {
    const [socket, setSocket] = useAtom<Socket>(socketAtom);

    return {
        socket,
        setSocket,
    };
};
