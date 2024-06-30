import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { ExperenceState, ExperienceOption } from "@/models";

const defaultExperienceState: ExperenceState = {
    stage: "init",
    option: null,
};
const experienceAtom = atom<ExperenceState>(defaultExperienceState);

export const useExperenceStates = () => {
    const [experienceState, setExperienceState] = useAtom(experienceAtom);

    const handleInit = useCallback(() => {
        setExperienceState(defaultExperienceState);
    }, [setExperienceState]);

    const handleStart = useCallback(
        (option: ExperienceOption) => {
            setExperienceState({ stage: "active", option: option });
        },
        [setExperienceState]
    );

    const handleFinish = useCallback(() => {
        setExperienceState((prev) => ({ ...prev, stage: "finish" }));
    }, [setExperienceState]);

    const isStartModalOpen = experienceState.stage === "init";
    const isEndModalOpen = experienceState.stage === "finish";

    return {
        modalState: {
            isStartModalOpen,
            isEndModalOpen,
        },
        handler: {
            handleInit,
            handleStart,
            handleFinish,
        },
    };
};
