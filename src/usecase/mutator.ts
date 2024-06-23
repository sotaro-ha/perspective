import { mutateText } from "@/generated/api";
import { MutateTextBody } from "@/generated/model";

import {
    ResultError as UsecaseError,
    ResultMethod as UsecaseMethod,
    ResultOk as UsecaseOk,
    guardUndef,
} from "@/utils";

export const sendTextToAI = (async (text: string[], id: number) => {
    const reqBody: MutateTextBody = {
        targetText: text,
        textIndex: 0, //FIXME: ここいらないかも
        clientId: id,
    };

    try {
        const res = await mutateText(reqBody);
        console.log(res);
        const mutatedText = res.data.result?.mutatedText;
        return UsecaseOk(guardUndef(mutatedText));
    } catch (error) {
        return UsecaseError(new Error(`AI送信失敗: ${error}`));
    }
}) satisfies UsecaseMethod;
