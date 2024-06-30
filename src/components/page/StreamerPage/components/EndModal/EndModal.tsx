/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Modal, Text } from "@mantine/core";
import { FC } from "react";

import { contentContainer } from "./EndModal.css";

interface EndModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (option: string) => void;
}

export const EndModal: FC<EndModalProps> = ({ isOpen, onClose, onSave }) => {
    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title="あなたの入力を保存しても構いませんか？"
            centered
        >
            <Text>
                保存した内容は，許可された用途以外に用いられることはありません．何かご不明点があれば，担当者にお伝えください．
            </Text>
            <div className={contentContainer}>
                <Button
                    variant="outline"
                    onClick={onClose}
                    style={{ marginRight: "0.5rem", width: "100%", marginTop: "1rem" }}
                >
                    保存しない
                </Button>
                <Button
                    onClick={() => onSave("private")}
                    style={{ marginTop: "1rem", width: "100%" }}
                >
                    保存してもよいが，公開しない
                </Button>
                <Button
                    onClick={() => onSave("public")}
                    style={{ marginTop: "1rem", width: "100%" }}
                >
                    保存してもよく，今後の展示で公開しても良い
                </Button>
            </div>
        </Modal>
    );
};
