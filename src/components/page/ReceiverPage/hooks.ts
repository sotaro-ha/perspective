import { useCallback, useRef } from "react";
import { match } from "ts-pattern";

import { convertStreamerTextToReceiverText } from "@/models";
import { useMutationStates } from "@/states";
import { useDiary } from "@/states/diary";
import { sendTextToAI } from "@/usecase";
import { guardRecursiveUndef, guardUndef } from "@/utils";

const FETCH_COUNT = 5;

export const useReceiver = (receiverId: number) => {
    const {
        receiver: { receivedText, setReceivedText },
    } = useDiary();
    const {
        mutationState,
        mutator: { lockMutation, unlockMutation },
    } = useMutationStates();

    const clientTextRef = useRef<string>("");

    const updateText = useCallback(
        (mutatedText: string[]) => {
            setReceivedText((prevText) => [
                ...prevText.slice(0, mutationState.mutatedLength),
                ...mutatedText,
                ...prevText.slice(mutationState.mutatedLength + mutatedText.length),
            ]);
        },
        [setReceivedText, mutationState]
    );

    const mutateText = useCallback(
        async (targetText: string[]) => {
            lockMutation();
            const res = await sendTextToAI(targetText, receiverId, mutationState.mutatedLength);
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
                        unlockMutation(mutatedText.length);
                    } else {
                        console.log("cancel mutation update");
                        unlockMutation(0);
                    }
                })
                .with({ status: "err" }, () => {
                    console.log(res.err?.message);
                    unlockMutation(0);
                });
        },
        [lockMutation, updateText, unlockMutation, receiverId, mutationState]
    );

    const handleInputChange = useCallback(async () => {
        const clientText = guardUndef(clientTextRef.current);
        const convertedClientText = convertStreamerTextToReceiverText(clientText);
        // 句読点と改行の数をカウント
        const mutateTarget = convertedClientText.slice(mutationState.mutatedLength, -1);
        console.log(mutateTarget, mutationState.mutatedLength, mutationState);
        const count = mutateTarget.length;

        // 5回以上の場合は mutation 実行
        if (count >= FETCH_COUNT && mutationState.stage === "ready") {
            console.log(`句点または改行が5回以上入力されました。: ${mutateTarget}`);
            await mutateText(mutateTarget);
        }
    }, [mutationState, mutateText]);

    return {
        clientTextRef,
        receivedText,
        handler: {
            handleInputChange,
        },
    };
};
