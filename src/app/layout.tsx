import { ColorSchemeScript } from "@mantine/core";
import { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import React from "react";

import ClientProviders from "./providers/client";
import ServerProviders from "./providers/server";

// import { ErrorHandler, Loader } from "@/components/common/functional";
// import { GlobalStateProvider } from "@/components/common/states/globalStates";

import "./globals.css";
import "@mantine/core/styles.css";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
    title: "III-Exhibition Extra Works-HAI.",
    description: "human-AI pair drawing app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={notoSansJP.className}>
                <ServerProviders>
                    <ClientProviders>{children}</ClientProviders>
                </ServerProviders>
            </body>
        </html>
    );
}
