"use client";
import { Textarea } from "@mantine/core";

import { useStreamer } from "./hooks";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const {
        textareaRef,
        clientText,
        handler: { handleInputChange },
    } = useStreamer();

    return (
        <Textarea
            classNames={{ input: textAreaStyle }}
            value={clientText}
            onChange={handleInputChange}
            placeholder="Write message"
            ref={textareaRef}
        ></Textarea>
    );
};
