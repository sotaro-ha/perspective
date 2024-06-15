import React, { useCallback, useRef } from "react";

import { useSockets } from "@/app/providers/socket";

export const useStreamService = () => {
    const { socket, socketText: clientText, setSocketText: setClientText } = useSockets();
    const timeoutRef = useRef<number | null>(null);

    const updateText = useCallback(
        (text: string) => {
            setClientText(text);
        },
        [setClientText]
    );

    const sendToServer = useCallback(
        (message: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // NOTE: windowをつける https://zenn.dev/sa2knight/scraps/76480f90f97497
            timeoutRef.current = window.setTimeout(() => {
                socket.emit("stream", message);
            }, 50);
        },
        [socket]
    );

    // 入力値が変更された時に実行される関数
    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value: text } = event.target;
            updateText(text);
            sendToServer(text);
            // sendToServer(text);
            // 句読点と改行の数をカウント
            const count = (text.match(/[.．。]/g) || []).length + (text.match(/\n/g) || []).length;

            // 5回以上の場合は console.log を実行
            if (count >= 5) {
                console.log("句読点または改行が5回以上入力されました。");
            }
        },
        [updateText, sendToServer]
    );

    return {
        socket,
        clientText,
        handler: { handleInputChange },
    };
};
