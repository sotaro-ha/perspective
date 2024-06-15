"use client";
import React, { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextInterface {
    socket: Socket;
    socketText?: string;
    setSocketText: Dispatch<SetStateAction<string>>;
    displayText?: string;
    setDisplayText: Dispatch<SetStateAction<string>>;
}

const socketUrl = process.env.SOCKET_URL ?? "http://localhost:8081";
//SOCKET_URLの中身のところに接続を要求

const SocketContext = createContext<SocketContextInterface>({
    socket: io(socketUrl),
    socketText: "",
    setSocketText: () => null,
    displayText: "",
    setDisplayText: () => null,
});

function SocketsProvider({ children }: { children: React.ReactNode }) {
    const [socketText, setSocketText] = useState<string>("");
    const [displayText, setDisplayText] = useState<string>("");
    const socket = io(socketUrl);

    return (
        <SocketContext.Provider
            value={{ socket, socketText, setSocketText, displayText, setDisplayText }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
