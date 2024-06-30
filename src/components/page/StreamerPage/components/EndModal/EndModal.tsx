/* eslint-disable no-empty-pattern */
"use client";
import { Button, Modal, Text } from "@mantine/core";
import { FC } from "react";

import { useStreamer } from "../../hooks";

import { useEndModal } from "./hooks";

import { contentContainer } from "./EndModal.css";

interface EndModalProps {}

export const EndModal: FC<EndModalProps> = ({}) => {
    const {
        isEndModalOpen,
        handler: { handleClick, handleClose },
    } = useEndModal();

    const { clientText } = useStreamer();

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
        handleClick();
    };

    return (
        <Modal
            opened={isEndModalOpen}
            onClose={handleClose}
            title="あなたの入力を保存しても構いませんか？"
            centered
        >
            <Text>
                保存した内容は，許可された用途以外に用いられることはありません．何かご不明点があれば，担当者にお伝えください．
            </Text>
            <div className={contentContainer}>
                <Button variant="outline" onClick={handleClick}>
                    保存しない
                </Button>
                <Button onClick={() => handleSave("private")}>保存してもよいが，公開しない</Button>
                <Button onClick={() => handleSave("public")}>
                    保存してもよく，今後の展示で公開しても良い
                </Button>
            </div>
        </Modal>
    );
};
