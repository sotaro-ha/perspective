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
        const currentRef = receivedTextRef.current;
        const observer = new MutationObserver(handleInputChange);

        if (currentRef) {
            observer.observe(currentRef, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }

        return () => {
            if (currentRef) {
                observer.disconnect();
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
