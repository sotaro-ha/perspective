/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const mutatedLengthAtom = atom<number>(0);
const isMutatingAtom = atom<boolean>(false);

export const useMutationStates = () => {
    const [mutatedLength, setMutatedLength] = useAtom(mutatedLengthAtom);
    const [isMutating, setIsMutating] = useAtom(isMutatingAtom);

    const startMutation = useCallback(() => {
        setIsMutating(true);
    }, [setIsMutating]);

    const finishMutation = useCallback(
        (mutatedText: string[]) => {
            setMutatedLength((prev) => prev + mutatedText.length);
            setIsMutating(false);
        },
        [setIsMutating, setMutatedLength]
    );

    const cancelMutation = useCallback(
        (clientText: string[]) => {
            console.log(clientText);
            setMutatedLength(clientText.length);
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
