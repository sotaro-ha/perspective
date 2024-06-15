"use client";

import React, { useEffect } from "react";

import { useReceiveService } from "@/service/streaming/receiver";

export const ReceiverPage = () => {
    const {
        socket,
        receivedTextRef,
        receivedText,
        driver: { setUpSocket, shutDownSocket },
        handler: { handleInputChange },
    } = useReceiveService();

    useEffect(() => {
        setUpSocket();

        return () => {
            shutDownSocket();
        };
    }, [socket]);

    useEffect(() => {
        const currentRef = receivedTextRef.current;
        if (currentRef) {
            currentRef.addEventListener("DOMSubtreeModified", handleInputChange);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("DOMSubtreeModified", handleInputChange);
            }
        };
    }, [receivedTextRef, handleInputChange]);

    return (
        <div>
            <h1>Received Messages</h1>
            <div ref={receivedTextRef}>{receivedText}</div>
        </div>
    );
};
