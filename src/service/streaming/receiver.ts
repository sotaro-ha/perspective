import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { useSockets } from "@/app/providers/socket";
import { guardUndef } from "@/utils/guardUndef";

import { sendTextToAI } from "../textModifier";

export const useReceiveService = () => {
    const { socket, socketText: receivedText, setSocketText: setReceivedText } = useSockets();
    const receivedTextRef = useRef<HTMLDivElement>(null);

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (text: string) => {
            setReceivedText(guardUndef(text));
        },
        [setReceivedText]
    );

    const setUpSocket = useCallback(() => {
        guardUndef(socket).on("connect", handleConnect);
        guardUndef(socket).on("receive", handleReceive);
    }, [socket, handleReceive, handleConnect]);

    const shutDownSocket = useCallback(() => {
        guardUndef(socket).off("connect", handleConnect);
        guardUndef(socket).off("receive", handleReceive);
    }, [socket, handleConnect, handleReceive]);

    const updateText = useCallback(
        (text: string) => {
            setReceivedText(text);
        },
        [setReceivedText]
    );

    const handleInputChange = useCallback(async () => {
        const text = guardUndef(receivedTextRef.current?.innerText);
        // 句読点と改行の数をカウント
        const count = (text.match(/[.．。]/g) || []).length + (text.match(/\n/g) || []).length;

        // 5回以上の場合は console.log を実行
        if (count >= 5) {
            console.log("句読点または改行が5回以上入力されました。");
            const res = await sendTextToAI({ text: text, index: 0, id: 0 });
            match(res)
                .with({ status: "ok" }, () => {
                    const modifiedText = guardUndef(res.val?.data.result?.modifiedText);
                    updateText(modifiedText);
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                });
        }
    }, [receivedTextRef, updateText]);

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
