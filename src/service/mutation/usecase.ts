import { modifyText } from "@/generated/api";
import { ModifyTextBody } from "@/generated/model";

import { useParams } from "next/navigation";

import { guardUndef } from "@/utils";
import { UsecaseMethod, UsecaseResultError, UsecaseResultOk } from "@/utils/result";

import { useTextMutation } from "./hooks";

export const mutateText = (async (text: string) => {
    const {
        mutatedIndex,
        mutator: { startMutation, finishMutation },
    } = useTextMutation();
    const params = useParams().toString();
    const id = parseInt(params.split("/")[1], 10);

    const reqBody: ModifyTextBody = {
        targetText: text,
        textIndex: mutatedIndex + 1,
        clientId: id,
    };

    try {
        startMutation();
        const res = await modifyText(reqBody);
        const mutatedText = guardUndef(res.data.result?.modifiedText);
        finishMutation(mutatedText);
        return UsecaseResultOk(res);
    } catch (error) {
        return UsecaseResultError(new Error(`AI送信失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
