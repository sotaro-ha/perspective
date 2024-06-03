"use client";
import React from "react";
import SocketsProvider from "./context";
export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return <SocketsProvider>{children}</SocketsProvider>;
}
