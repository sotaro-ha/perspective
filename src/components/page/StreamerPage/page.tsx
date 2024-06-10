"use client";
import React from "react";

import { useStreamService } from "@/service/streaming/streamer";

export const StreamerPage = () => {
    const {
        clientText,
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
