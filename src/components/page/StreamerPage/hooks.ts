import React, { useCallback } from "react";

import { useSockets } from "@/app/providers/socket";

import { useStreamService } from "@/service";

export const useStream = () => {
    const { sendToServer } = useStreamService();
    const { socketText: clientText, setSocketText: setClientText } = useSockets();

    const updateText = useCallback(
        (text: string) => {
            setClientText(text);
        },
        [setClientText]
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value: text } = event.target;
            updateText(text);
            sendToServer(text);
        },
        [updateText, sendToServer]
    );

    return {
        clientText,
        handler: {
            handleInputChange,
        },
    };
};
