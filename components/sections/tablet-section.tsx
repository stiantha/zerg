"use client";

import { ContainerScroll } from "@/components/ui/tablet-scroll-animation";
import { preload } from "react-dom";
import Image, { getImageProps } from "next/image";
import Zerg from "../../public/zerg-splash.jpeg";
import { useEffect, useState } from "react";

export default function TabletSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Preload the image manually
  const imageProps = {
    src: Zerg,
    alt: "Zerg Hero Image",
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
    <div className="flex flex-col w-full overflow-hidden max-w-full">
      <div className="w-full max-w-full overflow-hidden">
        <ContainerScroll titleComponent={<></>}>
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <Image
              src={Zerg}
              alt="Zerg Hero Image"
              height={isMobile ? 400 : 720}
              width={isMobile ? 800 : 1400}
              priority={true}
              quality={90}
              className="mx-auto object-cover w-full h-full"
              draggable={false}
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1400px"
              style={{ 
                objectFit: 'cover', 
                objectPosition: isMobile ? 'center' : 'left top',
                maxWidth: '100%',
                maxHeight: isMobile ? '300px' : '100%',
                borderRadius: '0.75rem'
              }}
            />
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
