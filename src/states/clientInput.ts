import { useCallback, useState } from "react";

export const useClientInput = () => {
    const [clientText, setClientText] = useState<string>("");

    // const isMutated = useCallback((aiOutput: string) => {}, []) service層とopenAPI整備してからだな
    const updateText = useCallback((text: string) => {
        setClientText(text);
    }, []);

    return {
        clientText,
        mutator: { updateText },
    };
};
