"use client";

import { useEffect } from "react";

import { useReceiveService } from "@/usecase";

import { useReceiver } from "./hooks";

export const ReceiverPage = () => {
    const { clientTextRef } = useReceiver();

    const {
        socket,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService(clientTextRef);

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket, setUpSocket, shutDownSocket]);

    return (
        <div>
            <div>{receivedText}</div>
        </div>
    );
};
