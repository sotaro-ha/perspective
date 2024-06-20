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
        (clientText: string[], mutatedText: string[]) => {
            setMutatedClientIndex((prev) => prev + clientText.length);
            setMutatedDisplayIndex((prev) => prev + mutatedText.length);
            setIsMutating(false);
        },
        [setIsMutating, setMutatedClientIndex, setMutatedDisplayIndex]
    );

    const getFinalIndex = useCallback((text: string) => {
        const reverseIndex = text
            .split("")
            .reverse()
            .findIndex((char) => /[.．。\n]/g.test(char));
        const lastIndex = reverseIndex !== -1 ? text.length - 1 - reverseIndex : 0;
        return lastIndex;
    }, []);

    const cancelMutation = useCallback(
        (clientText: string, displayText: string) => {
            const lastClientIndex = getFinalIndex(clientText);
            const lastDisplayIndex = getFinalIndex(displayText);
            setMutatedClientIndex(lastClientIndex);
            setMutatedDisplayIndex(lastDisplayIndex);
        },
        [getFinalIndex, setMutatedClientIndex, setMutatedDisplayIndex]
    );

    return {
        mutatedClientIndex,
        mutatedDisplayIndex,
        isMutating,
        mutator: {
            startMutation,
            finishMutation,
            cancelMutation,
        },
    };
};
