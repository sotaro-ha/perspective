"use client";
import Image from "next/image";
import { useState } from "react";

// import shadcn components
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
    const { toast } = useToast();
    const [test, setTest] = useState("")
    async function handleRoot() {
        const res = await fetch("/api/test");
        const data = await res.json();
        console.log(data);
        toast({ description: `status:${data.status},api:${data.OPENAIAPI_TestResult}` });
    }
    return (
        <main className="font-mincho flex justify-center p-6">
            <div className="grid w-full max-w-2xl gap-2">
                <Textarea placeholder="Type your message here." />
                <Button onClick={handleRoot}>Test /</Button>
            </div>
        </main>
    );
}
