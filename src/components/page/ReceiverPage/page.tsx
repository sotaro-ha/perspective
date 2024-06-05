"use client";

import React, { useEffect } from "react";

import { useReceiveService } from "@/service/receiver";

export const ReceiverPage = () => {
    const {
        socket,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
    } = useReceiveService();

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket]);

    return (
        <div>
            <h1>Received Messages</h1>
            {receivedText}
        </div>
    );
};

export default ReceiverPage;
