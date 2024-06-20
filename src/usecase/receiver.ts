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
    const {
        mutatedLength,
        mutator: { cancelMutation },
    } = useMutationStates();

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (value: string) => {
            const text = convertText(value);

            if (text.length <= mutatedLength) {
                cancelMutation(text);
            }

            setReceivedText((prev) =>
                text.length > mutatedLength
                    ? [...prev.slice(0, mutatedLength), ...text.slice(mutatedLength)]
                    : prev.slice(0, mutatedLength)
            );
        },
        [setReceivedText, mutatedLength, cancelMutation]
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
