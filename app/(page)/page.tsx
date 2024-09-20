import { createClient } from "@/utils/supabase/server";
import { title, subtitle } from "../../components/primitives";
import HeroSection from "./components/HeroSection/HeroSection";
import FirstSection from "./components/Section1/FirstSection";
import SecondSection from "./components/Section2/SecondSection";
import ThirdSection from "./components/Section3/ThirdSection";
import FourthSection from "./components/Section4/FourthSection";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profile").select("*").eq("user_id", user.id).single()
    : { data: null };

  return (
    <section className="flex flex-col min-h-dvh">
      {/* <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div> */}
      <HeroSection />
      <FirstSection />
      <SecondSection user={user} />
      <ThirdSection />
      <FourthSection user={user} profile={profile} />
    </section>
  );
}
