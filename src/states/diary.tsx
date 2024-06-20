import { atom, useAtom } from "jotai";
import { useState } from "react";

const receivedTextAtom = atom<string[]>([]);
export const useDiary = () => {
    const [clientText, setClientText] = useState<string>("");
    const [receivedText, setReceivedText] = useAtom<string[]>(receivedTextAtom);

    return {
        client: { clientText, setClientText },
        receiver: {
            receivedText,
            setReceivedText,
        },
    };
};
