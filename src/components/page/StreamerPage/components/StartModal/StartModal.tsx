/* eslint-disable no-empty-pattern */
"use client";
import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconVideo } from "@tabler/icons-react";
import React, { FC } from "react";

import { ExperienceMode, experienceDataList } from "@/models";

import { useStartModal } from "./hooks";

import { buttonLabelStyle, buttonRootStyle } from "./StartModal.css";

interface StartModalProps {}

export const StartModal: FC<StartModalProps> = ({}) => {
    const {
        isStartModalOpen,
        handler: { handleClick },
    } = useStartModal();
    const iconMap: Record<ExperienceMode, React.ElementType> = {
        Diary: IconPencil,
        Demo: IconVideo,
    };

    return (
        <Modal
            opened={isStartModalOpen}
            onClose={() => {}}
            size="lg"
            title="体験を始めます"
            centered
            withCloseButton={false}
        >
            <Text>
                体験を開始する方法を選んでください．自分で書く前にでもを確認することもできます．
            </Text>
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {experienceDataList.map((experienceData) => {
                    const IconComponent = iconMap[experienceData.mode];
                    return (
                        <Tooltip
                            label={`${experienceData.label}を開始する`}
                            key={experienceData.mode}
                        >
                            <Button
                                onClick={() => handleClick(experienceData.mode)}
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
