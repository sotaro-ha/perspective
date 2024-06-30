import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { match } from "ts-pattern";

import { convertStreamerTextToReceiverText } from "@/models";
import { useMutationStates } from "@/states";
import { useDiary } from "@/states/diary";
import { sendTextToAI } from "@/usecase";
import { guardRecursiveUndef, guardUndef } from "@/utils";

const FETCH_COUNT = 5;

export const useReceiver = () => {
    const {
        receiver: { receivedText, setReceivedText },
    } = useDiary();
    const {
        isMutating,
        mutatedLength,
        mutator: { startMutation, finishMutation },
    } = useMutationStates();

    const params = useParams();
    const reciverId = parseInt(params.id[0], 10);

    const clientTextRef = useRef<string>("");

    const updateText = useCallback(
        (mutatedText: string[]) => {
            setReceivedText((prevText) => [
                ...prevText.slice(0, mutatedLength),
                ...mutatedText,
                ...prevText.slice(mutatedLength + mutatedText.length),
            ]);
        },
        [setReceivedText, mutatedLength]
    );

    const mutateText = useCallback(
        async (targetText: string[]) => {
            startMutation();
            const res = await sendTextToAI(targetText, reciverId, mutatedLength);
            match(res)
                .with({ status: "ok" }, () => {
                    const { mutatedText, mutatedLength: resMutatedLength } = guardRecursiveUndef(
                        res.val
                    );
                    const clientText = guardUndef(clientTextRef.current);
                    const convertedClientText = convertStreamerTextToReceiverText(clientText);

                    if (
                        convertedClientText
                            .slice(resMutatedLength, resMutatedLength + mutatedText.length)
                            .join("") === targetText.join("")
                    ) {
                        updateText(mutatedText);
                    } else {
                        console.log("cancel mutation update");
                    }
                    finishMutation(mutatedText);
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                    finishMutation([]);
                });
        },
        [startMutation, updateText, finishMutation, reciverId, mutatedLength]
    );

    const handleInputChange = useCallback(async () => {
        const clientText = guardUndef(clientTextRef.current);
        const convertedClientText = convertStreamerTextToReceiverText(clientText);
        // 句読点と改行の数をカウント
        const mutateTarget = convertedClientText.slice(mutatedLength, -1);
        console.log(mutateTarget, mutatedLength);
        const count = mutateTarget.length;

        // 5回以上の場合は mutation 実行
        if (count >= FETCH_COUNT && !isMutating) {
            console.log(`句点または改行が5回以上入力されました。: ${mutateTarget}`);
            await mutateText(mutateTarget);
        }
    }, [isMutating, mutateText, mutatedLength]);

    useEffect(() => {
        handleInputChange();
    }, [receivedText]);

    return {
        clientTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
