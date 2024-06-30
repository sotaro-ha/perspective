/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Textarea } from "@mantine/core";

import { useExperenceStates } from "@/states";

import { useStreamer } from "./hooks";

import { EndModal, StartModal } from "./components";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const {
        textareaRef,
        clientText,
        handler: { handleInputChange },
    } = useStreamer();

    const {
        handler: { handleFinish },
    } = useExperenceStates();

    return (
        <>
            <StartModal />
            <EndModal />
            <Textarea
                classNames={{ input: textAreaStyle }}
                value={clientText}
                onChange={handleInputChange}
                placeholder="Write message"
                ref={textareaRef}
            />

            <Button onClick={handleFinish}>体験を終了する</Button>
        </>
    );
};
