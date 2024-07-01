import { Button, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconApple, IconBook, IconBrush, IconPencil } from "@tabler/icons-react";
import React from "react";

import { DemoSelection, demoSelectionList } from "@/models";

import { useDemoModal } from "./hooks";

import { buttonLabelStyle, buttonRootStyle } from "./DemoModal.css";

export const DemoModal = () => {
    const {
        isDemoModalOpen,
        handler: { handleClick },
    } = useDemoModal();
    const iconMap: Record<DemoSelection["key"], React.ElementType> = {
        apple: IconApple,
        book: IconBook,
        brush: IconBrush,
        pencil: IconPencil,
    };

    return (
        <Modal
            opened={isDemoModalOpen}
            onClose={() => {}}
            size="lg"
            title="体験を始めます"
            centered
        >
            <Text>
                体験を開始する方法を選んでください．自分で書く前にでもを確認することもできます．
            </Text>
            <Group mt="4rem" style={{ display: "flex", justifyContent: "center" }}>
                {demoSelectionList.map((selection) => {
                    const IconComponent = iconMap[selection.key];
                    return (
                        <Tooltip label={selection.label} key={selection.key}>
                            <Button
                                onClick={() => handleClick(selection)}
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
