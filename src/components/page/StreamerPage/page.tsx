/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Textarea } from "@mantine/core";
import { useCallback, useEffect, useRef } from "react";
import { match } from "ts-pattern";

import { experienceDataList } from "@/models";
import { useExperenceStates } from "@/states";

import { demoInput } from "./consts";
import { useStreamer } from "./hooks";

import { DemoModal, EndModal, StartModal } from "./components";

import { controlAreaStyle, textAreaStyle, wrapper } from "./page.css";

export const StreamerPage = () => {
    const {
        textareaRef,
        clientText,
        updateText,
        handler: { handleInputChange, handleReset },
    } = useStreamer();

    const { experienceState, diaryHandler, demoHandler } = useExperenceStates();

    const handleEndButtonClick = useCallback(() => {
        match(experienceState.mode)
            .with("Diary", () => {
                diaryHandler.handleFinish();
            })
            .with("Demo", () => {
                handleReset();
                demoHandler.handleInit();
            });
    }, [experienceState, diaryHandler, demoHandler]);

    const handleBackButtonClick = useCallback(() => {
        demoHandler.handleSelectDemo();
    }, [demoHandler]);

    const intervalRef = useRef<number>(0);

    useEffect(() => {
        if (experienceState.mode === "Demo" && experienceState.selection) {
            const demoText = demoInput[experienceState.selection.key];
            let index = 1; // 初期値を1に設定して、最初の文字を表示

            intervalRef.current = window.setInterval(() => {
                if (index <= demoText.length) {
                    updateText(demoText.slice(0, index));
                    index++;
                } else {
                    clearInterval(intervalRef.current);
                }
            }, 100); // 100ミリ秒ごとに更新
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [experienceState, updateText]);

    useEffect(() => {
        if (experienceState.mode === "Demo" && experienceState.selection) {
            handleInputChange(clientText);
        }
    }, [clientText, experienceState]);

    return (
        <div className={wrapper}>
            <StartModal />
            <DemoModal />
            <EndModal />
            <Textarea
                classNames={{ input: textAreaStyle }}
                value={clientText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Write message"
                ref={textareaRef}
                disabled={experienceState.mode === "Demo"}
            />

            <div className={controlAreaStyle}>
                {experienceState.mode !== null && (
                    <Button onClick={handleEndButtonClick}>
                        {`${experienceDataList.find((item) => item.mode === experienceState.mode)?.label}を終了する`}
                    </Button>
                )}
                {experienceState.mode === "Demo" && (
                    <Button onClick={handleBackButtonClick}>他のデモを見る</Button>
                )}
            </div>
        </div>
    );
};
