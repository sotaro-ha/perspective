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
    const [reverseTest, setReverseTest] = useState("")
    async function handleRoot() {
        const res = await fetch("/api/test");
        const data = await res.json();
        toast({ description: `status:${data.status},api:${data.OPENAIAPI_TestResult}` });
    }
    async function handleRewrite() {
        try {
            const res = await fetch("/api/rewrite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: test }), // 確認: 'test' はこの関数内で定義または外部から渡されていますか？
            });
            if (!res.ok) {
                // サーバーからのレスポンスが成功を示さない場合、エラーメッセージを投げる
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json(); // 正常なJSONレスポンスを仮定

            // トースト通知でレスポンスを表示
            toast({ description: `Status: ${data.status}, Content: ${data.content}` });
        } catch (error: any) {
            // エラーが発生した場合の処理をここに書く
            console.error("Failed to fetch data:", error);
            toast({ description: `Error: ${error.message}` });
        }
    }
    return (
        <main className="font-mincho flex justify-center p-6">
            <div className="grid w-full max-w-2xl gap-2">
                <Button onClick={handleRoot}>Test /</Button>
            </div>
            <div className="grid w-full max-w-2xl gap-2">
                <Textarea placeholder="Type your message here."
                    value={test} // textareaの値として `text` 状態を設定
                    onChange={(e) => setTest(e.target.value)}
                />
                <Button onClick={handleRewrite}>Test rewrite</Button>
            </div>
            <div className="grid w-full max-w-2xl gap-2">
                <Textarea placeholder="Type your message here."
                    value={reverseTest} // textareaの値として `text` 状態を設定
                    onChange={(e) => setReverseTest(e.target.value)}
                />
                <Button onClick={handleRewrite}>Test rewrite Reverse</Button>
            </div>
        </main>
    );
}
