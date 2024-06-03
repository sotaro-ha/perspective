"use client";
import React from "react";
import SocketsProvider from "./socket";
export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return <SocketsProvider>{children}</SocketsProvider>;
}
