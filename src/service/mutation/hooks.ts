import { useCallback, useState } from "react";

export const useTextMutation = () => {
    const [mutatedIndex, setMutatedIndex] = useState<number>(0);
    const [isMutating, setIsMutating] = useState<boolean>(false);

    const startMutation = useCallback(() => {
        setIsMutating(true);
    }, [setIsMutating]);

    const finishMutation = useCallback(
        (mutatedText: string) => {
            setMutatedIndex((prev) => prev + mutatedText.length);
            setIsMutating(false);
        },
        [setIsMutating]
    );

    return {
        mutatedIndex,
        isMutating,
        mutator: {
            startMutation,
            finishMutation,
        },
    };
};
