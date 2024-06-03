"use client";
import React, { useCallback, useRef, useState } from "react";
import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";

export const StreamingPage = () => {
    const { socket } = useSockets();
    const [inputValue, setInputValue] = useState("");

    // デバウンスされた関数を定義
    const sendToServer = useCallback(
        (message: string) => {
            setTimeout(() => {
                if (message) {
                    console.log(message);
                    socket.emit("sendMessage", message);
                }
            }, 500);
        },
        [socket]
    ); // 500ミリ秒のデバウンス時間

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
