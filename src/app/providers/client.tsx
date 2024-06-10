"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import { getBaseUrl } from "@/utils";

import SocketsProvider from "./socket";
export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const baseUrl = getBaseUrl();

    axios.defaults.baseURL = baseUrl;

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) {
        axios.defaults.headers.common["x-api-key"] = apiKey;
    }
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <SocketsProvider>{children}</SocketsProvider>;
        </QueryClientProvider>
    );
}
