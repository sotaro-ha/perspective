/* eslint-disable no-unused-vars */
"use client";
import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextInterface {
    socket: Socket;
    socketText?: string;
    setSocketText: Dispatch<SetStateAction<string>>;
}

const socketUrl = process.env.SOCKET_URL ?? "http://localhost:8081";
//SOCKET_URLの中身のところに接続を要求
const newSocket = io(socketUrl);

const SocketContext = createContext<SocketContextInterface>({
    socket: newSocket,
    socketText: "",
    setSocketText: () => null,
});

function SocketsProvider({ children }: { children: React.ReactNode }) {
    const [socketText, setSocketText] = useState<string>("");
    const [socket, setSocket] = useState<Socket>(newSocket);

    return (
        <SocketContext.Provider
            value={{
                socket,
                socketText,
                setSocketText,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
