import { useCallback } from "react";

import { ExperienceOption } from "@/models";
import { useExperenceStates } from "@/states";

export const useStartModal = () => {
    const {
        experienceState,
        handler: { handleStart },
    } = useExperenceStates();

    const isStartModalOpen = experienceState.stage === "init";

    const handleClose = useCallback(() => {
        handleStart(null);
    }, [handleStart]);

    const handleClick = useCallback(
        (option: ExperienceOption) => {
            handleStart(option);
        },
        [handleStart]
    );

    return {
        isStartModalOpen,
        handler: {
            handleClose,
            handleClick,
        },
    };
};
