/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
"use client";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React, { useState } from "react";

interface StartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
}

const StartModal: React.FC<StartModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const options = [
        { label: "", icon: <IconBook />, value: "study" },
        { label: "りんごの夢", icon: <IconApple />, value: "apple" },
        { label: "", icon: <IconBrush />, value: "art" },
        { label: "", icon: <IconPencil />, value: "pencil" },
    ];

    return (
        <Modal opened={isOpen} onClose={onClose} size="lg" title="体験を始めます" centered>
            <Text>
                体験を開始する方法を選んでください．テンプレートを選択することも，自分で書くこともできます．
            </Text>
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {options.map((option) => (
                    <Tooltip label={option.label} key={option.value}>
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
                                        hoveredOption === option.value ? "scale(1.1)" : "scale(1)",
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
                            {option.icon}
                        </Button>
                    </Tooltip>
                ))}
            </Group>
        </Modal>
    );
};

export default StartModal;
