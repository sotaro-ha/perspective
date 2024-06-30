import { style } from "@vanilla-extract/css";

export const buttonRootStyle = style({
    width: "80px",
    height: "92px",
    background:
        "conic-gradient(from 0deg, #ffffff, #B1B1B1, #ffffff, #B1B1B1,#ffffff, #B1B1B1,#ffffff)",
    color: "#111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    margin: "0 1rem",
    transition: "all 0.3s ease",
    filter: "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.1))",
    ":hover": {
        backgroundColor:
            "conic-gradient(from 90deg, #ffffff, #B1B1B1,#96BDD1, #ffffff, #B1B1B1,#E3ED95,#ffffff, #B1B1B1,#91DCB7,#ffffff,#E2B9E1,#ffffff)",
        transform: "scale(1.1)",
        filter: "drop-shadow(0 0px 10px rgba(0, 0, 0, 0.25))",
    },
});

export const buttonLabelStyle = style({
    fontWeight: "bold",
    fontSize: "2rem",
    transition: "all 0.3s ease",
    ":hover": {
        fontSize: "3rem",
    },
});
