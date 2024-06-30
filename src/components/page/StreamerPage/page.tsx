/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";

import EndModal from "./EndModal";
import { useStreamer } from "./hooks";
import StartModal from "./StartModal";

import { textAreaStyle } from "./page.css";

export const StreamerPage = () => {
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const {
        textareaRef,
        clientText,
        handler: { handleInputChange, resetText },
    } = useStreamer();

    useEffect(() => {
        // Show the start modal when the component mounts
        setIsStartModalOpen(true);

        // Add event listener for ESC key
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleEndExperience();
            }
        };
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const handleStartSelect = (option: string) => {
        setSelectedOption(option);
        setIsStartModalOpen(false);
    };

    const handleSave = (option: string) => {
        // Prepend "公開可" if the option is "public"
        const textToSave = option === "public" ? `公開可\n${clientText}` : clientText;

        // Create a blob with the text data
        const date = new Date().toISOString();
        const blob = new Blob([textToSave], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `experienceData_${date}_${option}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsEndModalOpen(false);
        setIsStartModalOpen(true); // Reopen the start modal
        resetText(); // Reset the clientText
    };

    const handleCloseEndModal = () => {
        setIsEndModalOpen(false);
        resetText(); // Reset the clientText
        setIsStartModalOpen(true);
    };

    const handleEndExperience = () => {
        setIsEndModalOpen(true);
    };

    return (
        <>
            <StartModal
                isOpen={isStartModalOpen}
                onClose={() => setIsStartModalOpen(false)}
                onSelect={handleStartSelect}
            />
            <EndModal isOpen={isEndModalOpen} onClose={handleCloseEndModal} onSave={handleSave} />
            <Textarea
                classNames={{ input: textAreaStyle }}
                value={clientText}
                onChange={handleInputChange}
                placeholder="Write message"
                ref={textareaRef}
            />

            <Button onClick={handleEndExperience}>体験を終了する</Button>
        </>
    );
};
