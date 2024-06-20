import { atom, useAtom } from "jotai";
import { useCallback } from "react";

const mutatedDisplayIndexAtom = atom<number>(0);
const mutatedClientIndexAtom = atom<number>(0);
const isMutatingAtom = atom<boolean>(false);

export const useMutationStates = () => {
    const [mutatedDisplayIndex, setMutatedDisplayIndex] = useAtom(mutatedDisplayIndexAtom);
    const [mutatedClientIndex, setMutatedClientIndex] = useAtom(mutatedClientIndexAtom);
    const [isMutating, setIsMutating] = useAtom(isMutatingAtom);

    const startMutation = useCallback(() => {
        setIsMutating(true);
    }, [setIsMutating]);

    const finishMutation = useCallback(
        (clientText: string, mutatedText: string) => {
            setMutatedClientIndex((prev) => prev + clientText.length);
            setMutatedDisplayIndex((prev) => prev + mutatedText.length);
            setIsMutating(false);
        },
        [setIsMutating, setMutatedClientIndex, setMutatedDisplayIndex]
    );

    return {
        mutatedClientIndex,
        mutatedDisplayIndex,
        isMutating,
        mutator: {
            startMutation,
            finishMutation,
        },
    };
};
