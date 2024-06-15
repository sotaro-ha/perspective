import { useRef } from "react";

import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";

import { sendTextToAI } from "../textModifier";

export const useReceiveService = () => {
    const { socket, socketText: receivedText, setSocketText: setReceivedText } = useSockets();
    const receivedTextRef = useRef<HTMLDivElement>(null);

    const handleConnect = () => {
        console.log("Connected to WebSocket server");
    };

    const handleReceive = (text: string) => {
        setReceivedText(guardUndef(text));
    };

    const setUpSocket = () => {
        socket.on("connect", handleConnect);
        socket.on("receive", handleReceive);
    };

    const shutDownSocket = () => {
        socket.off("connect", handleConnect);
        socket.off("receive", handleReceive);
    };

    const handleInputChange = async () => {
        const text = guardUndef(receivedTextRef.current?.innerText);
        // 句読点と改行の数をカウント
        const count = (text.match(/[.．。]/g) || []).length + (text.match(/\n/g) || []).length;

        // 5回以上の場合は console.log を実行
        if (count >= 5) {
            console.log("句読点または改行が5回以上入力されました。");
            const res = await sendTextToAI({ text: text, index: 0, id: 0 });
            console.log(res);
        }
    };

    return {
        socket,
        receivedTextRef,
        receivedText,
        driver: {
            setUpSocket,
            shutDownSocket,
        },
        handler: {
            handleInputChange,
        },
    };
};
