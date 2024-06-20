import { useCallback, useRef } from "react";

import { useSocket } from "@/states/socket";

export const useStreamService = () => {
    const { socket } = useSocket();
    const timeoutRef = useRef<number | null>(null);

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

    return {
        socket,
        sendToServer,
    };
};
