/* eslint-disable no-empty-pattern */
"use client";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { FC } from "react";

import { ExperienceOption, experienceOptionList } from "@/models";

import { useStartModal } from "./hooks";

import { buttonLabelStyle, buttonRootStyle } from "./StartModal.css";

interface StartModalProps {}

export const StartModal: FC<StartModalProps> = ({}) => {
    const {
        isStartModalOpen,
        handler: { handleClick, handleClose },
    } = useStartModal();
    const iconMap: Record<NonNullable<ExperienceOption>["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    return (
        <Modal
            opened={isStartModalOpen}
            onClose={handleClose}
            size="lg"
            title="体験を始めます"
            centered
        >
            <Text>
                体験を開始する方法を選んでください．テンプレートを選択することも，自分で書くこともできます．
            </Text>
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {experienceOptionList.map((option) => {
                    const IconComponent = iconMap[option.key];
                    return (
                        <Tooltip label={option.label} key={option.key}>
                            <Button
                                onClick={() => handleClick(option)}
                                classNames={{
                                    root: buttonRootStyle,
                                    label: buttonLabelStyle,
                                }}
                            >
                                <IconComponent />
                            </Button>
                        </Tooltip>
                    );
                })}
            </Group>
        </Modal>
    );
};
