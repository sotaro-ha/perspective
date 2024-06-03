"use client";
import { Message } from "@/models/types";
import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextInterface {
    socket: Socket;
    setUsername: Dispatch<SetStateAction<Socket>>;
    messages?: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
}

const socketUrl = process.env.SOCKET_URL ?? "http://localhost:8080";
//SOCKET_URLの中身のところに接続を要求
const socket = io(socketUrl);

const SocketContext = createContext<SocketContextInterface>({
    socket,
    setUsername: () => false,
    setMessages: () => false,
});

function SocketsProvider(props: any) {
    const [messages, setMessages] = useState([]);

    return <SocketContext.Provider value={{ socket, messages, setMessages }} {...props} />;
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
