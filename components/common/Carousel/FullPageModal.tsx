"use client";

import React, { useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { DotButton, useDotButton } from "./CarouselDotButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      backdrop={"blur"}
    >
      <ModalContent className="bg-transparent scrollbar-hide">
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            {/* <ModalBody> */}
            <section className="embla embla_fullpage">
              <div className="embla__viewport--full" ref={emblaRef}>
                <div className="embla__container">
                  {imageList.map((src, index) => (
                    <div className="embla__slide" key={index}>
                      <img
                        onClick={() => {
                          setIsFullPageModalOpen(true);
                        }}
                        src={src}
                        alt={"carousel_image-" + index}
                        className={"w-full h-full object-contain"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="embla__controls">
                {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div> */}

                <div className="embla__dots">
                  {scrollSnaps.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={"embla__dot".concat(
                        index === selectedIndex ? " embla__dot--selected" : ""
                      )}
                    />
                  ))}
                </div>
              </div>
            </section>
            {/* </ModalBody> */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default FullPageModal;
