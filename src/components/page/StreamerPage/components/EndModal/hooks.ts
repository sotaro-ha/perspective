import { useCallback } from "react";

import { useExperenceStates } from "@/states";

import { useStreamer } from "../../hooks";

export const useEndModal = () => {
    const { experienceState, diaryHandler } = useExperenceStates();
    const {
        handler: { handleReset },
    } = useStreamer();
    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        diaryHandler.handleExperience();
    }, [diaryHandler]);

    const handleClick = useCallback(() => {
        handleReset();
        diaryHandler.handleInit();
    }, [handleReset, diaryHandler]);
    return {
        isEndModalOpen,
        handler: { handleClick, handleClose },
    };
};
