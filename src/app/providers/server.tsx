"use client";

import { MantineProvider } from "@mantine/core";
import React from "react";

import { theme } from "@/styles";

/**
 * Server サイドで利用できるプロバイダー
 */
export default function ServerProviders({ children }: { children: React.ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
