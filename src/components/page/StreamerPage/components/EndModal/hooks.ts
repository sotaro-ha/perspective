import { useCallback } from "react";

import { useExperenceStates } from "@/states";

export const useEndModal = () => {
    const { experienceState, diaryHandler } = useExperenceStates();
    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        diaryHandler.handleExperience();
    }, [diaryHandler]);

    const handleClick = useCallback(() => {
        diaryHandler.handleInit();
    }, [diaryHandler]);
    return {
        isEndModalOpen,
        handler: { handleClick, handleClose },
    };
};
