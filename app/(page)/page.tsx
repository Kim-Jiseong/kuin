"use client";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  console.log("session", session);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
        <h2 className={subtitle({ class: "mt-4" })}>
          {session ? session?.user?.name : "None"}
        </h2>
      </div>
      <div>
        <Button
          onClick={() =>
            signIn("google", { state: JSON.stringify({ role: "client" }) })
          }
        >
          SignIn
        </Button>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </section>
  );
}
