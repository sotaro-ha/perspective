"use client";

import React, { useEffect, useState } from "react";

import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";

export const ReceiverPage = () => {
    const [message, setMessage] = useState<string>("");
    const { socket } = useSockets();

    useEffect(() => {
        const handleConnect = () => {
            console.log("Connected to WebSocket server");
        };

        const handleReceive = (receivedMessage: string) => {
            setMessage(guardUndef(receivedMessage));
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
            {message}
        </div>
    );
};

export default ReceiverPage;
