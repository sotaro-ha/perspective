import Image from "next/image";

// import shadcn components
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
    return (
        <main className="font-mincho">
            <div className="grid w-full gap-2">
                <Textarea placeholder="Type your message here." />
                <Button>Send message</Button>
            </div>
        </main>
    );
}
