"use client";

import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Image from "next/image";

const OPTIONS: EmblaOptionsType = {};

function FullPageModal({
  isOpen,
  onOpenChange,
  imageList,
  defaultIndex,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imageList: string[];
  defaultIndex: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [isFullPageModalOpen, setIsFullPageModalOpen] = React.useState(false);
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-transparent scrollbar-hide max-w-full h-full">
        <section className="embla embla_fullpage">
          <div className="embla__viewport--full" ref={emblaRef}>
            <div className="embla__container">
              {imageList.map((src, index) => (
                <div className="embla__slide" key={index}>
                  <Image
                    role="presentation"
                    src={src}
                    alt={"carousel_image-" + index}
                    className="w-full h-full object-contain"
                    width={1200}
                    height={1200}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  role="presentation"
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default FullPageModal;
