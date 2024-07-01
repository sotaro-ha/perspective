import { style } from "@vanilla-extract/css";

import { vars } from "@/styles";

export const wrapper = style({
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
});

export const textAreaStyle = style({
    display: "flex",
    width: "100vw",
    height: "95vh",
    fontSize: vars.fontSizes.xl,
});

export const controlAreaStyle = style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100vw",
    height: "5vh",
});

export const buttonStyle = style({
    display: "flex",
    marginTop: "1rem",
});
