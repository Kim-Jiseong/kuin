import { Tables } from "@/types/database.types";
import { getMajorObjByCode } from "@/utils/getMajorObjByCode";
import { returnMajorColor } from "@/utils/returnMajorColor";
import { EmblaOptionsType } from "embla-carousel";
import { Chip, Image, ScrollShadow } from "@nextui-org/react";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { useRouter } from "next/navigation";
import Typography from "@/components/common/Typography";

const OPTIONS: EmblaOptionsType = {};

function ExpertProfileDisplayCard({ profile }: { profile: Tables<"profile"> }) {
  const router = useRouter();
  const [emblaRefMini, emblaApiMini] = useEmblaCarousel(OPTIONS);
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel(OPTIONS);

  const slides =
    profile.expert_profile?.portfolio &&
    profile.expert_profile?.portfolio.length > 0
      ? profile.expert_profile.portfolio
      : profile.expert_profile?.profileImage
        ? Array(profile.expert_profile?.profileImage as string)
        : [
            "https://flmlczkwdmnqilqdhmxn.supabase.co/storage/v1/object/public/files/source/default_user.webp",
          ];
  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링을 막음
  };

  if (!profile.expert_profile) return null;
  return (
    <div
      role="button"
      onClick={() => {
        router.push(`/experts/${profile.id}`);
      }}
      className={`w-full lg:w-[calc(50%_-_0.5rem)] 
        h-[auto] lg:h-[200px] shadow-md rounded-large
         p-4 flex flex-col sm:flex-row gap-3 border-1 border-divider 
         cursor-pointer hover:bg-content2 transition-all duration-200`}
    >
      <div className="flex flex-shrink-0">
        {/* <Image
          // as={<NextImage/>}
          isZoomed
          isBlurred
          alt="Portfolio Thumbnail Image"
          className="w-[168px] h-[168px] rounded-xl object-cover"
          src={
            profile.expert_profile?.portfolio &&
            profile.expert_profile?.portfolio.length > 0
              ? profile.expert_profile.portfolio?.[0]
              : profile.expert_profile.profileImage
          }
        /> */}

        <section
          className="embla__mini  hidden sm:block"
          onClick={handleChildClick}
          role="button"
        >
          <div className="embla__mini__viewport" ref={emblaRefMini}>
            <div className="embla__mini__container">
              {slides.map((src, index) => (
                <div className="embla__mini__slide" key={index}>
                  <Image
                    alt="Portfolio Thumbnail Image"
                    className="w-[168px] h-[168px] rounded-xl object-cover"
                    src={src}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="embla__mobile  sm:hidden aspect-square rounded-lg"
          onClick={handleChildClick}
          role="button"
        >
          <div className="embla__mobile__viewport" ref={emblaRefMobile}>
            <div className="embla__mobile__container">
              {slides.map((src, index) => (
                <div className="embla__mobile__slide" key={index}>
                  <Image
                    removeWrapper
                    alt="Portfolio Thumbnail Image"
                    radius={"none"}
                    className="w-[full] object-cover min-w-full aspect-square"
                    src={src}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-2 h-full">
        <h4 className="font-bold text-large flex items-center gap-2">
          <Typography variant="subtitle2" ellipsis lines={1}>
            {profile.expert_profile.name}
          </Typography>
          <Chip
            size="sm"
            color={returnMajorColor(profile.expert_profile.major as string)}
          >
            {getMajorObjByCode(profile.expert_profile.major as string)?.name}
          </Chip>
        </h4>
        <ScrollShadow className={"w-full h-[80px] sm:h-full overflow-auto"}>
          {profile.expert_profile.introduction}
        </ScrollShadow>
      </div>
    </div>
  );
}

export default ExpertProfileDisplayCard;
