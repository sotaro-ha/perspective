"use client";

import { useEffect } from "react";

import { useReceiveService } from "@/usecase";

import { useReceiver } from "./hooks";

export const ReceiverPage = () => {
    const {
        socket,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService();

    const {
        receivedTextRef,
        handler: { handleInputChange },
    } = useReceiver();

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    useEffect(() => {
        handleInputChange();
    }, [receivedText]);

    return (
        <div>
            <h1>Received Messages</h1>
            <div ref={receivedTextRef}>{receivedText}</div>
        </div>
    );
};
