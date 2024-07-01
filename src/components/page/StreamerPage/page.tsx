/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Textarea } from "@mantine/core";
import { useCallback } from "react";
import { match } from "ts-pattern";

import { experienceDataList } from "@/models";
import { useExperenceStates } from "@/states";

import { useStreamer } from "./hooks";

import { DemoModal, EndModal, StartModal } from "./components";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const {
        textareaRef,
        clientText,
        handler: { handleInputChange },
    } = useStreamer();

    const { experienceState, diaryHandler, demoHandler } = useExperenceStates();

    const handleEndButtonClick = useCallback(() => {
        match(experienceState.mode)
            .with("Diary", () => {
                diaryHandler.handleFinish();
            })
            .with("Demo", () => {
                demoHandler.handleInit();
            });
    }, [experienceState, diaryHandler, demoHandler]);

    return (
        <>
            <StartModal />
            <DemoModal />
            <EndModal />
            <Textarea
                classNames={{ input: textAreaStyle }}
                value={clientText}
                onChange={handleInputChange}
                placeholder="Write message"
                ref={textareaRef}
            />

            <Button onClick={handleEndButtonClick}>
                {`${experienceDataList.find((item) => item.mode === experienceState.mode)?.label}を終了する`}
            </Button>
        </>
    );
};
