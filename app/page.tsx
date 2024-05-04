import Image from "next/image";

// import shadcn components
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <main className="font-mincho">
      <Textarea className="h-screen text-9xl" placeholder="Jot anything down......" />
    </main>
  );
}
