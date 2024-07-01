import { Button, Tooltip } from "@mantine/core";
import { ElementType, FC, Key } from "react";

import { buttonLabelStyle, buttonRootStyle } from "./PrismaButton.css";

type props = {
    label: string;
    keyValue?: Key;
    onClick: () => void;
    IconComponent: ElementType;
};

export const PrismaButton: FC<props> = (props) => {
    const { label, keyValue, onClick, IconComponent } = props;
    return (
        <Tooltip label={label} key={keyValue}>
            <Button
                onClick={onClick}
                classNames={{
                    root: buttonRootStyle,
                    label: buttonLabelStyle,
                }}
            >
                <IconComponent />
            </Button>
        </Tooltip>
    );
};
