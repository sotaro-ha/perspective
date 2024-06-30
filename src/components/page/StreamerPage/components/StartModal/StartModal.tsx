/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { FC, useState } from "react";

import { ExperienceOption, experienceOptionList } from "@/models";
import { useExperenceStates } from "@/states";

import { buttonLabelStyle, buttonRootStyle } from "./StartModal.css";

interface StartModalProps {
    onClose: () => void;
    onSelect: (option: string) => void;
}

export const StartModal: FC<StartModalProps> = ({ onClose, onSelect }) => {
    const {
        modalState: { isStartModalOpen },
        handler: { handleStart },
    } = useExperenceStates();
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    const iconMap: Record<NonNullable<ExperienceOption>["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    return (
        <Modal
            opened={isStartModalOpen}
            onClose={() => handleStart(null)}
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
                                onClick={() => onSelect(option.value)}
                                onMouseEnter={() => setHoveredOption(option.value)}
                                onMouseLeave={() => setHoveredOption(null)}
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
