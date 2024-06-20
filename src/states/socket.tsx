import { atom, useAtom } from "jotai";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_URL ?? "http://localhost:8081";
const defaultSocket = io(SOCKET_URL);
const socketAtom = atom(defaultSocket);

export const useSocket = () => {
    const [socket, setSocket] = useAtom<Socket>(socketAtom);

    return {
        socket,
        setSocket,
    };
};
