"use client";
import { Textarea } from "@mantine/core";
import React from "react";

import { useStreamService } from "@/service/streaming/streamer";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const {
        test,
        clientText,
        handler: { handleInputChange },
    } = useStreamService();

    test();

    return (
        <Textarea
            classNames={{ input: textAreaStyle }}
            value={clientText}
            onChange={handleInputChange}
            placeholder="Write message"
        ></Textarea>
    );
};
