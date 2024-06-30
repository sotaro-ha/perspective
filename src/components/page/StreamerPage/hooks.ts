import React, { useCallback, useRef } from "react";

import { StreamerText } from "@/models";
import { useDiary } from "@/states/diary";
import { useStreamService } from "@/usecase";
import { guardUndef } from "@/utils";

export const useStreamer = () => {
    const { sendToServer } = useStreamService();
    const {
        client: { clientText, setClientText },
    } = useDiary();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const updateText = useCallback(
        (text: StreamerText) => {
            setClientText(text);
        },
        [setClientText]
    );

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value: streamerText } = event.target;
            updateText(streamerText);
            sendToServer({
                text: streamerText,
                cursorPosition: guardUndef(textareaRef.current?.selectionStart),
            });
        },
        [updateText, sendToServer]
    );

    const handleReset = useCallback(() => {
        setClientText("");
    }, [setClientText]);

    return {
        textareaRef,
        clientText,
        handler: {
            handleInputChange,
            handleReset,
        },
    };
};
