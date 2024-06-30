import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";
export const textAreaStyle = style({
    width: "100vw",
    height: "95vh",
    fontSize: vars.fontSizes.xl,
});

export const buttonStyle = style({
    width: "100%",
    marginTop: "1rem",
});