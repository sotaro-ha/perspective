/* eslint-disable no-empty-pattern */
"use client";
import { Group } from "@mantine/core";
import { IconPencil, IconVideo } from "@tabler/icons-react";
import React, { FC } from "react";

import { ExperienceMode, experienceDataList } from "@/models";

import { useStartModal } from "./hooks";

import { PrismaButton, SelectModal } from "@/components/shared";

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
        <SelectModal
            isOpen={isStartModalOpen}
            mainText="体験を始めます"
            subText="体験を開始する方法を選んでください．自分で書く前にデモを確認することもできます．"
        >
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {experienceDataList.map((experienceData) => {
                    return (
                        <PrismaButton
                            label={`${experienceData.label}を開始する`}
                            key={experienceData.mode}
                            onClick={() => handleClick(experienceData.mode)}
                            IconComponent={iconMap[experienceData.mode]}
                        />
                    );
                })}
            </Group>
        </SelectModal>
    );
};
