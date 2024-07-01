/* eslint-disable no-empty-pattern */
"use client";
import { Modal, Text } from "@mantine/core";
import { FC, ReactNode } from "react";

type props = {
    isOpen: boolean;
    mainText: string;
    subText: string;
    onClose?: () => void;
    children: ReactNode;
};

export const SelectModal: FC<props> = (props) => {
    const { isOpen, mainText, subText, onClose, children } = props;

    return (
        <Modal
            opened={isOpen}
            onClose={onClose || (() => {})}
            size="lg"
            title={mainText}
            centered
            withCloseButton={!!onClose}
        >
            <Text>{subText}</Text>
            {children}
        </Modal>
    );
};
