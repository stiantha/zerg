"use client";

import { ContainerScroll } from "@/components/ui/tablet-scroll-animation";
import { preload } from "react-dom";
import Image, { getImageProps } from "next/image";
import Zerg from "../../public/zerg-splash.jpeg";

export default function TabletSection() {
  // Preload the image manually
  const imageProps = {
    src: Zerg,
    alt: "hero",
    height: 720,
    width: 1400,
    priority: true,
  };

  const { props: transformedProps } = getImageProps(imageProps);

  preload(transformedProps.src, {
    as: "image",
    imageSrcSet: transformedProps.srcSet,
    imageSizes: transformedProps.sizes,
    fetchPriority: transformedProps.fetchPriority,
  });

  return (
    <div className="flex flex-col overflow-visible">
      <ContainerScroll titleComponent={<></>}>
        <div className="relative w-full">
          <Image
            src={Zerg}
            alt="hero"
            height={720}
            width={1400}
            priority={true}
            quality={100}
            className="mx-auto rounded-2xl object-cover object-left-top"
            draggable={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
          />
        </div>
      </ContainerScroll>
    </div>
  );
}
