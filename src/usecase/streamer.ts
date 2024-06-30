import { useCallback, useRef } from "react";

import { StreamerSocketMessage } from "@/models";
import { useSocket } from "@/states/socket";

export const useStreamService = () => {
    const { socket } = useSocket();
    const timeoutRef = useRef<number | null>(null);

    const sendToServer = useCallback(
        (socketMessage: StreamerSocketMessage) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // NOTE: windowをつける https://zenn.dev/sa2knight/scraps/76480f90f97497
            timeoutRef.current = window.setTimeout(() => {
                socket.emit("stream", socketMessage);
            }, 50);
        },
        [socket]
    );

    return {
        socket,
        sendToServer,
    };
};
