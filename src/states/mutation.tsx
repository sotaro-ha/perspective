/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const mutatedLengthAtom = atom<number>(0);
const isMutatingAtom = atom<boolean>(false);
const targetTextAtom = atom<string[]>([]);

export const useMutationStates = () => {
    const [mutatedLength, setMutatedLength] = useAtom(mutatedLengthAtom);
    const [isMutating, setIsMutating] = useAtom(isMutatingAtom);
    const [targetText, setTargetText] = useAtom(targetTextAtom);

    const startMutation = useCallback(() => {
        setIsMutating(true);
    }, [setIsMutating]);

    const finishMutation = useCallback(
        (mutatedText: string[]) => {
            setMutatedLength(mutatedText.length);
            setIsMutating(false);
        },
        [setIsMutating, setMutatedLength]
    );

    const cancelMutation = useCallback(
        (clientText: string[]) => {
            setMutatedLength(clientText.length - 1);
        },
        [setMutatedLength]
    );

    return {
        mutatedLength,
        isMutating,
        targetText,
        mutator: {
            startMutation,
            finishMutation,
            cancelMutation,
            setTargetText,
        },
    };
};
