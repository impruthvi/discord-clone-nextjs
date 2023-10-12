import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <p>Discord Clone</p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </>
  );
}
