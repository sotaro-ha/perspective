"use client";
import React, { useCallback, useRef, useState } from "react";
import { useSockets } from "@/app/providers/socket";

export const StreamerPage = () => {
    const { socket } = useSockets();
    const [inputValue, setInputValue] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const sendToServer = useCallback(
        (message: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                if (message) {
                    console.log(message);
                    socket.emit("stream", message);
                }
            }, 500);
        },
        [socket]
    );

    // 入力値が変更された時に実行される関数
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setInputValue(value);
            sendToServer(value);
        },
        [setInputValue, sendToServer]
    );

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Write message"
            />
            <Messages />
        </>
    );
};

const Messages = () => {
    const { messages } = useSockets();
    return (
        <>
            {messages && (
                <div>
                    {messages.map(({ message }, index) => {
                        return <li key={index}>{message}</li>;
                    })}
                </div>
            )}
        </>
    );
};
