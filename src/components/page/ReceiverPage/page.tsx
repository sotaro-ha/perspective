"use client";

import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";
import React, { useEffect, useState } from "react";

export const ReceiverPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const { socket } = useSockets();

    useEffect(() => {
        const handleConnect = () => {
            console.log("Connected to WebSocket server");
        };

        const handleReceive = (message: string) => {
            console.log(message);
            setMessages((prevMessages) => [...prevMessages, guardUndef(message)]);
        };

        socket.on("connect", handleConnect);
        socket.on("receive", handleReceive);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("receive", handleReceive);
        };
    }, [socket]);

    return (
        <div>
            <h1>Received Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReceiverPage;
