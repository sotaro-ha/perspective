import { MutableRefObject, useCallback } from "react";

import { StreamerSocketMessage, convertSocketMessage } from "@/models";
import { useMutationStates } from "@/states";
import { useDiary } from "@/states/diary";
import { useSocket } from "@/states/socket";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = (clientTextRef: MutableRefObject<string>) => {
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
        (message: StreamerSocketMessage) => {
            const receivedMessage = convertSocketMessage(message);
            const { text, inputIndex } = receivedMessage;

            if (inputIndex < mutatedLength) {
                cancelMutation(inputIndex);
            }

            setReceivedText((prev) => [...prev.slice(0, inputIndex), ...text.slice(inputIndex)]);
            clientTextRef.current = message.text;
        },
        [setReceivedText, mutatedLength, cancelMutation, clientTextRef]
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
