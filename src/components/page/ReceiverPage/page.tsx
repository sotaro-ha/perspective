"use client";

import { useEffect, useRef } from "react";

import { useReceiveService } from "@/usecase";

import { useReceiver } from "./hooks";

export const ReceiverPage = () => {
    const clientTextRef = useRef<string>("");
    const {
        socket,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService(clientTextRef);

    const {
        handler: { handleInputChange },
    } = useReceiver();

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    useEffect(() => {
        handleInputChange(clientTextRef);
    }, [receivedText, clientTextRef]);

    return (
        <div>
            <h1>Received Messages</h1>
            <div>{receivedText}</div>
        </div>
    );
};
