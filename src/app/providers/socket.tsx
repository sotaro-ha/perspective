"use client";
import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import io, { Socket } from "socket.io-client";

import { Message } from "@/models/types";

interface SocketContextInterface {
    socket: Socket;
    messages?: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
}

const socketUrl = process.env.SOCKET_URL ?? "http://localhost:8080";
//SOCKET_URLの中身のところに接続を要求

const SocketContext = createContext<SocketContextInterface>({
    socket: io(socketUrl),
    messages: [],
    setMessages: () => null,
});

function SocketsProvider(children: any) {
    const [messages, setMessages] = useState<Message[]>([]);
    const socket = io(socketUrl);

    return <SocketContext.Provider value={{ socket, messages, setMessages }} {...children} />;
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
