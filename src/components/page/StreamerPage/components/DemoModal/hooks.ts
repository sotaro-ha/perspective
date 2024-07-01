import { useCallback } from "react";

import { DemoSelection } from "@/models";
import { useExperenceStates } from "@/states";

export const useDemoModal = () => {
    const { experienceState, demoHandler } = useExperenceStates();
    const isDemoModalOpen = experienceState.stage === "select";

    const handleClick = useCallback(
        (selection: DemoSelection) => {
            demoHandler.handleExperience(selection);
        },
        [demoHandler]
    );

    return {
        isDemoModalOpen,
        handler: {
            handleClick,
        },
    };
};
