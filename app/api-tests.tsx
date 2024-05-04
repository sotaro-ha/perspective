"use client";
import Image from "next/image";
import { useState } from "react";

// import shadcn components
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
    const {toast} = useToast();
    const [test,setTest] = useState("")
    async function handleRoot() {
        const res = await fetch("/api/test");
        const data = await res.json();

    }
    return (

        <main className="font-mincho">
            <div className="grid w-full gap-2">
                <Textarea placeholder="Type your message here." />
                <Button>Test /</Button>
            </div>
        </main>
    );
}
