/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

import { mutationState } from "@/models";

const mutatedLengthAtom = atom<number>(0);
const isMutatingAtom = atom<mutationState>("ready");

export const useMutationStates = () => {
    const [mutatedLength, setMutatedLength] = useAtom(mutatedLengthAtom);
    const [isMutating, setIsMutating] = useAtom(isMutatingAtom);

    const startMutation = useCallback(() => {
        setIsMutating("pending");
    }, [setIsMutating]);

    const finishMutation = useCallback(
        (mutatedText: string[]) => {
            setMutatedLength((prev) => prev + mutatedText.length);
            setIsMutating("ready");
        },
        [setIsMutating, setMutatedLength]
    );

    const cancelMutation = useCallback(
        (clientInputIndex: number) => {
            setMutatedLength(clientInputIndex);
        },
        [setMutatedLength]
    );

    return {
        mutatedLength,
        isMutating,
        mutator: {
            startMutation,
            finishMutation,
            cancelMutation,
        },
    };
};
