/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { MutationState } from "@/models";

const defaultMutationState: MutationState = {
    stage: "ready",
    mutatedLength: 0,
};

const mutationStateAtom = atom<MutationState>(defaultMutationState);

export const useMutationStates = () => {
    const [mutationState, setMutationState] = useAtom(mutationStateAtom);

    const lockMutation = useCallback(() => {
        setMutationState((prev) => ({ ...prev, stage: "pending" }));
    }, [setMutationState]);

    const unlockMutation = useCallback(
        (mutatedLength: number) => {
            setMutationState((prev) => ({
                ...prev,
                mutatedLength: prev.mutatedLength + mutatedLength,
                stage: "ready",
            }));
        },
        [setMutationState]
    );

    const cancelMutation = useCallback(
        (cancelIndex: number) => {
            setMutationState((prev) => ({
                ...prev,
                mutatedLength: cancelIndex,
                stage: "cancel",
            }));
        },
        [setMutationState]
    );

    return {
        mutationState,
        mutator: {
            lockMutation,
            unlockMutation,
            cancelMutation,
        },
    };
};
