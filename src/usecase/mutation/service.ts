import { mutateText } from "@/generated/api";
import { MutateTextBody } from "@/generated/model";

import { guardUndef } from "@/utils";

export const sendTextToAI = async ({
    text,
    index,
    id,
}: {
    text: string;
    index: number;
    id: number;
}) => {
    const reqBody: MutateTextBody = {
        targetText: text,
        textIndex: index,
        clientId: id,
    };

    try {
        const res = await mutateText(reqBody);
        return guardUndef(res.data.result);
    } catch (error) {
        throw new Error(`${error}`);
    }
};
