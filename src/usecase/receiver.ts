import { useCallback } from "react";

import { useSockets } from "@/app/providers/socket";
import { useMutationStates } from "@/states";
import { guardUndef } from "@/utils/guardUndef";

export const useReceiveService = () => {
    const { socket, socketText: receivedText, setSocketText: setReceivedText } = useSockets();
    const { mutatedClientIndex, mutatedDisplayIndex } = useMutationStates();

    const handleConnect = useCallback(() => {
        console.log("Connected to WebSocket server");
    }, []);

    const handleReceive = useCallback(
        (text: string[]) => {
            // if (text.length < mutatedClientIndex) {
            //     cancelMutation(text, guardUndef(receivedText));
            // }

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
