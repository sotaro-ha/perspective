"use client";
import React from "react";

import { useStreamService } from "@/service/stream";
import { useClientInput } from "@/states/clientInput";

export const StreamerPage = () => {
    const { clientText } = useClientInput();
    const {
        handler: { handleInputChange },
    } = useStreamService();

    return (
        <input
            type="text"
            value={clientText}
            onChange={handleInputChange}
            placeholder="Write message"
        />
    );
};
