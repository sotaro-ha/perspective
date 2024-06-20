import { useCallback } from "react";

import { useMutationStates } from "@/states";
import { useDiary } from "@/states/diary";
import { useSocket } from "@/states/socket";
import { convertText } from "@/utils";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket } = useSocket();
    const {
        receiver: { receivedText, setReceivedText },
    } = useDiary();
    const { mutatedClientIndex, mutatedDisplayIndex } = useMutationStates();

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (value: string) => {
            // if (text.length < mutatedClientIndex) {
            //     cancelMutation(text, guardUndef(receivedText));
            // }
            const text = convertText(value);

            setReceivedText((prev) => [
                ...prev.slice(0, mutatedDisplayIndex),
                ...text.slice(mutatedClientIndex),
            ]);
        },
        [setReceivedText, mutatedClientIndex, mutatedDisplayIndex]
    );

    const setUpSocket = useCallback(() => {
        guardUndef(socket).on("connect", handleConnect);
        guardUndef(socket).on("receive", handleReceive);
    }, [socket, handleReceive, handleConnect]);

    const shutDownSocket = useCallback(() => {
        guardUndef(socket).off("connect", handleConnect);
        guardUndef(socket).off("receive", handleReceive);
    }, [socket, handleConnect, handleReceive]);

    return {
        socket,
        receivedText,
        driver: {
            setUpSocket,
            shutDownSocket,
        },
    };
};
