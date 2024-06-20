"use client";
import { Textarea } from "@mantine/core";

import { useStream } from "./hooks";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const {
        clientText,
        handler: { handleInputChange },
    } = useStream();

    return (
        <Textarea
            classNames={{ input: textAreaStyle }}
            value={clientText}
            onChange={handleInputChange}
            placeholder="Write message"
        ></Textarea>
    );
};
