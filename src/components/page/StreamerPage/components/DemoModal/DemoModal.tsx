import { Group } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React from "react";

import { DemoSelection, demoSelectionList } from "@/models";

import { useDemoModal } from "./hooks";

import { PrismaButton, SelectModal } from "@/components/shared";

export const DemoModal = () => {
    const {
        isDemoModalOpen,
        handler: { handleClick, handleClose },
    } = useDemoModal();
    const iconMap: Record<DemoSelection["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    return (
        <SelectModal
            isOpen={isDemoModalOpen}
            onClose={() => handleClose()}
            mainText="デモを見ることができます．"
            subText="見たいデモを選んでください．"
        >
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {demoSelectionList.map((selection) => {
                    return (
                        <PrismaButton
                            label={selection.label}
                            key={selection.key}
                            onClick={() => handleClick(selection)}
                            IconComponent={iconMap[selection.key]}
                        />
                    );
                })}
            </Group>
        </SelectModal>
    );
};
