import { atom, useAtom } from "jotai";
import { useState } from "react";

import { ReceiverText, StreamerText } from "@/models";

const receivedTextAtom = atom<string[]>([]);
export const useDiary = () => {
    const [clientText, setClientText] = useState<StreamerText>("");
    const [receivedText, setReceivedText] = useAtom<ReceiverText>(receivedTextAtom);

    return {
        client: { clientText, setClientText },
        receiver: {
            receivedText,
            setReceivedText,
        },
    };
};
