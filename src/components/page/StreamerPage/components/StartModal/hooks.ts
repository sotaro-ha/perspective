import { useCallback } from "react";
import { match } from "ts-pattern";

import { ExperienceMode } from "@/models";
import { useExperenceStates } from "@/states";
import { guardUndef } from "@/utils";

export const useStartModal = () => {
    const { experienceState, diaryHandler, demoHandler } = useExperenceStates();

    const isStartModalOpen = experienceState.stage === "init";

    const handleClick = useCallback(
        (mode: ExperienceMode) => {
            match(mode)
                .with("Diary", () => {
                    diaryHandler.handleSelectMode(guardUndef(mode));
                    diaryHandler.handleExperience();
                })
                .with("Demo", () => {
                    demoHandler.handleSelectMode(guardUndef(mode));
                    demoHandler.handleSelectDemo();
                });
        },
        [diaryHandler, demoHandler]
    );

    return {
        isStartModalOpen,
        handler: {
            handleClick,
        },
    };
};
