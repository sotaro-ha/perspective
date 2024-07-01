import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles";

export const wrapper = recipe({
    base: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
    },
    variants: {
        id: {
            0: {
                backgroundColor: vars.colors.black,
                color: vars.colors.white,
                fontSize: vars.fontSizes.xl,
            },
            1: {
                backgroundColor: vars.colors.primary[0],
                fontSize: vars.fontSizes.lg,
            },
            2: {
                backgroundColor: vars.colors.white,
                fontSize: vars.fontSizes.md,
            },
            3: {
                backgroundColor: vars.colors.white,
                fontSize: vars.fontSizes.sm,
            },
            4: {
                backgroundColor: vars.colors.white,
                fontSize: vars.fontSizes.xs,
            },
        },
    },
    defaultVariants: {
        id: 0,
    },
});
