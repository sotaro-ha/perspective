import { atom, useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useCallback } from "react";

import {
    ResultError as UsecaseError,
    ResultMethod as UsecaseMethod,
    ResultOk as UsecaseOk,
} from "@/utils";

import { sendTextToAI } from ".";

// Atom definitions
const mutatedDisplayIndexAtom = atom<number>(0);
const mutatedClientIndexAtom = atom<number>(0);
const isMutatingAtom = atom<boolean>(false);

// Hook to use these atoms
export const useTextMutation = () => {
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

    const params = useParams();

    const mutateText = useCallback(
        async (text: string) => {
            const id = parseInt(params.id[0], 10);
            const props = {
                text: text,
                index: mutatedDisplayIndex + 1,
                id: id,
            };

            try {
                startMutation();
                const res = await sendTextToAI(props);
                const mutatedText = res.mutatedText;
                return UsecaseOk(mutatedText);
            } catch (error) {
                return UsecaseError(new Error(`AI送信失敗: ${error}`));
            }
        },
        [startMutation, mutatedDisplayIndex, params]
    ) satisfies UsecaseMethod;

    return {
        isMutating,
        mutatedDisplayIndex,
        mutatedClientIndex,
        setMutatedClientIndex,
        mutateText,
        mutator: {
            finishMutation,
        },
    };
};
