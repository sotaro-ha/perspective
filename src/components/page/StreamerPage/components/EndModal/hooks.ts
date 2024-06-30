import { useCallback } from "react";

import { useExperenceStates } from "@/states";

import { useStreamer } from "../../hooks";

export const useEndModal = () => {
    const {
        experienceState,
        handler: { handleInit, handleStart },
    } = useExperenceStates();
    const {
        handler: { handleReset },
    } = useStreamer();
    const isEndModalOpen = experienceState.stage === "finish";

    const handleClose = useCallback(() => {
        handleStart(null);
    }, [handleStart]);

    const handleClick = useCallback(() => {
        handleReset();
        handleInit();
    }, [handleReset, handleInit]);
    return {
        isEndModalOpen,
        handler: { handleClick, handleClose },
    };
};
