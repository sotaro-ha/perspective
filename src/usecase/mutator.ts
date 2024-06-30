import { mutateText } from "@/generated/api";
import { MutateTextBody } from "@/generated/model";

import {
    ResultError as UsecaseError,
    ResultMethod as UsecaseMethod,
    ResultOk as UsecaseOk,
    guardUndef,
} from "@/utils";

export const sendTextToAI = (async (text: string[], id: number, mutatedLength: number) => {
    const reqBody: MutateTextBody = {
        targetText: text,
        mutatedLength: mutatedLength,
        clientId: id,
    };

    try {
        const res = await mutateText(reqBody);
        console.log(res);
        return UsecaseOk(guardUndef(res.data.result));
    } catch (error) {
        return UsecaseError(new Error(`AI送信失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
