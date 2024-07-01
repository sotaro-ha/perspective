import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { DemoSelection, ExperienceMode, ExperienceState } from "@/models";
import { guardUndef } from "@/utils";

const defaultExperienceState: ExperienceState = {
    mode: null,
    stage: "init",
};
const experienceAtom = atom<ExperienceState>(defaultExperienceState);

export const useExperenceStates = () => {
    const [experienceState, setExperienceState] = useAtom(experienceAtom);

    const handleSelectMode = useCallback(
        (mode: NonNullable<ExperienceMode>) => {
            setExperienceState((prev) => ({ mode: mode, stage: prev.stage }) as ExperienceState);
        },
        [setExperienceState]
    );
    const handleInit = useCallback(() => {
        setExperienceState(defaultExperienceState);
    }, [setExperienceState]);

    const handleSelectDemo = useCallback(() => {
        setExperienceState({ mode: "Demo", stage: "select" });
    }, [setExperienceState]);

    const handleExperience = useCallback(
        (selection?: DemoSelection) => {
            setExperienceState((prev) => ({
                mode: guardUndef(prev.mode),
                stage: "experience",
                selection: selection,
            }));
        },
        [setExperienceState]
    );

    const handleFinish = useCallback(() => {
        setExperienceState({ stage: "finish", mode: "Diary" });
    }, [setExperienceState]);

    return {
        experienceState,
        diaryHandler: {
            handleInit,
            handleSelectMode,
            handleExperience,
            handleFinish,
        },
        demoHandler: {
            handleInit,
            handleSelectMode,
            handleSelectDemo,
            handleExperience,
        },
    };
};
