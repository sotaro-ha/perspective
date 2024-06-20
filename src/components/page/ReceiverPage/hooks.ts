import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { useSockets } from "@/app/providers/socket";
import { useTextMutation } from "@/usecase/mutation/hooks";
import { guardUndef } from "@/utils";

export const useReceiver = () => {
    const { socketText: receivedText, setSocketText: setReceivedText } = useSockets();
    const {
        isMutating,
        mutatedDisplayIndex,
        mutateText,
        mutator: { finishMutation },
    } = useTextMutation();

    const receivedTextRef = useRef<HTMLDivElement>(null);

    const updateText = useCallback(
        (text: string) => {
            setReceivedText(text);
        },
        [setReceivedText]
    );

    const handleInputChange = useCallback(async () => {
        const text = guardUndef(receivedTextRef.current?.innerHTML);
        // 句読点と改行の数をカウント
        const targetText = text.slice(mutatedDisplayIndex);
        const count =
            (targetText.match(/[.．。]/g) || []).length + (targetText.match(/\n/g) || []).length;

        // 5回以上の場合は mutation 実行
        if (count >= 5 && !isMutating) {
            console.log("句読点または改行が5回以上入力されました。");
            const res = await mutateText(targetText);
            match(res)
                .with({ status: "ok" }, () => {
                    const mutatedText = guardUndef(res.val);
                    const displayText = text.slice(0, mutatedDisplayIndex) + mutatedText;
                    updateText(displayText);
                    finishMutation(targetText, mutatedText);
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                });
        }
    }, [updateText, isMutating, mutateText, finishMutation, mutatedDisplayIndex]);

    return {
        receivedTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
