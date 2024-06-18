import { modifyText } from "@/generated/api";
import { ModifyTextBody } from "@/generated/model";

import { UsecaseResultError, UsecaseResultOk, UsecaseMethod } from "@/utils/result";

export const sendTextToAI = (async ({
    text,
    index,
    id,
}: {
    text: string;
    index: number;
    id: number;
}) => {
    const reqBody: ModifyTextBody = {
        targetText: text,
        textIndex: index,
        clientId: id,
    };

    try {
        const res = await modifyText(reqBody);
        return UsecaseResultOk(res);
    } catch (error) {
        return UsecaseResultError(new Error(`AI送信失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
