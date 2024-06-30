/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { FC, useState } from "react";

import { ExperienceOption, experienceOptionList } from "@/models";
import { useExperenceStates } from "@/states";

interface StartModalProps {
    onClose: () => void;
    onSelect: (option: string) => void;
}

const StartModal: FC<StartModalProps> = ({ onClose, onSelect }) => {
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
                                styles={{
                                    root: {
                                        width: "80px",
                                        height: "92px",
                                        background:
                                            hoveredOption === option.value
                                                ? "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)"
                                                : "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
                                        color: "#111111",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        position: "relative",
                                        margin: "0 1rem",
                                        transition: "all 0.3s ease",
                                        transform:
                                            hoveredOption === option.value
                                                ? "scale(1.1)"
                                                : "scale(1)",
                                        //transform: hoveredOption === option.value ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                                        //transformOrigin: 'left', // Shift rotation center to the left
                                        //transformStyle: 'preserve-3d',
                                        //perspective: '1000px',
                                        filter:
                                            hoveredOption === option.value
                                                ? "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.25))"
                                                : "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.1))",
                                    },
                                    label: {
                                        fontWeight: "bold",
                                        fontSize: hoveredOption === option.value ? "3rem" : "2rem",
                                        transition: "all 0.3s ease",
                                    },
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

export default StartModal;
