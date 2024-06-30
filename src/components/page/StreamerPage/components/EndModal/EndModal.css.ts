import { style } from "@vanilla-extract/css";

export const contentContainer = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: "1rem",
    gap: "1rem 1rem",
});

export const buttonStyle = style({
    display: "flex",
    width: "100%",
});
