import React, { useCallback } from "react";

import { useDiary } from "@/states/diary";
import { useStreamService } from "@/usecase";

export const useStream = () => {
    const { sendToServer } = useStreamService();
    const {
        client: { clientText, setClientText },
    } = useDiary();

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

    const resetText = useCallback(() => {
        setClientText("");
    }, [setClientText]);

    return {
        clientText,
        handler: {
            handleInputChange,
            resetText
        },
    };
};
