import { useParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { useSockets } from "@/app/providers/socket";
import { useMutationStates } from "@/states";
import { sendTextToAI } from "@/usecase";
import { guardUndef } from "@/utils";

export const useReceiver = () => {
    const { socketText: receivedText, setSocketText: setReceivedText } = useSockets();
    const {
        isMutating,
        mutatedDisplayIndex,
        mutator: { startMutation, finishMutation },
    } = useMutationStates();

    const params = useParams();
    const id = parseInt(params.id[0], 10);

    const receivedTextRef = useRef<HTMLDivElement>(null);

    const updateText = useCallback(
        (text: string) => {
            setReceivedText(text);
        },
        [setReceivedText]
    );

    const mutateText = useCallback(
        async (displayText: string, targetText: string) => {
            startMutation();
            const res = await sendTextToAI(targetText, id);
            match(res)
                .with({ status: "ok" }, () => {
                    const mutatedText = guardUndef(res.val);
                    console.log(mutatedDisplayIndex);
                    const newDisplayText = displayText.slice(0, mutatedDisplayIndex) + mutatedText;
                    updateText(newDisplayText);
                    finishMutation(targetText, mutatedText);
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                    finishMutation(targetText, "");
                });
        },
        [startMutation, updateText, finishMutation, id, mutatedDisplayIndex]
    );

    const handleInputChange = useCallback(async () => {
        const text = guardUndef(receivedTextRef.current?.innerHTML);
        // 句読点と改行の数をカウント
        const targetText = text.slice(mutatedDisplayIndex);
        const count =
            (targetText.match(/[.．。]/g) || []).length + (targetText.match(/\n/g) || []).length;

        // 5回以上の場合は mutation 実行
        if (count >= 5 && !isMutating) {
            console.log(`句点または改行が5回以上入力されました。: ${targetText}`);
            await mutateText(text, targetText);
        }
    }, [isMutating, mutateText, mutatedDisplayIndex]);

    return {
        receivedTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
