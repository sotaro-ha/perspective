import { useParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { useMutationStates } from "@/states";
import { useDiary } from "@/states/diary";
import { sendTextToAI } from "@/usecase";
import { convertText, guardUndef } from "@/utils";

export const useReceiver = () => {
    const {
        receiver: { receivedText, setReceivedText },
    } = useDiary();
    const {
        isMutating,
        mutatedLength,
        targetText,
        mutator: { startMutation, finishMutation },
    } = useMutationStates();

    const params = useParams();
    const id = parseInt(params.id[0], 10);

    const receivedTextRef = useRef<HTMLDivElement>(null);

    const updateText = useCallback(
        (mutatedText: string[]) => {
            setReceivedText((prevText) => [...mutatedText, ...prevText.slice(mutatedText.length)]);
        },
        [setReceivedText]
    );

    const mutateText = useCallback(
        async (targetText: string[]) => {
            startMutation();
            const res = await sendTextToAI(targetText, id);
            match(res)
                .with({ status: "ok" }, () => {
                    const mutatedText = guardUndef(res.val);
                    updateText(mutatedText);
                    finishMutation(mutatedText);
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                    finishMutation([]);
                });
        },
        [startMutation, updateText, finishMutation, id]
    );

    const handleInputChange = useCallback(async () => {
        const value = guardUndef(receivedTextRef.current?.innerHTML);
        const text = convertText(value);
        // 句読点と改行の数をカウント
        const checkTarget = text.slice(mutatedLength);
        const count = checkTarget.length;

        // 5回以上の場合は mutation 実行
        if (count === 5 && !isMutating) {
            console.log(`句点または改行が5回以上入力されました。: ${targetText}`);
            await mutateText(targetText);
        }
    }, [isMutating, targetText, mutateText, mutatedLength]);

    return {
        receivedTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
