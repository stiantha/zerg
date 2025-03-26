"use client";
"use client";

import { ContainerScroll } from "@/components/ui/tablet-scroll-animation";
import { preload } from "react-dom";
import Image, { getImageProps } from "next/image";
import Zerg from "../../public/zerg-splash.jpeg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 2px 15px rgba(0, 207, 255, 0.3)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

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

  const imageProps = {
    src: Zerg,
    alt: "Zerg Hero Image",
    height: 1020,
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center items-center justify-center">
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Learn development
          </motion.h1>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#00cfff] uppercase"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            The fun way
          </motion.h2>
        </div>
        
        <motion.div 
          className="max-w-2xl mx-auto space-y-2 text-gray-300 text-sm sm:text-base md:text-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <p>
            Master coding through our innovative game-based learning platform.
          </p>
          <p>
            Experience rapid skill acquisition inspired by the Zerg mentality.
          </p>
          <p>
            Join our growing hive of successful zerg developers!
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link
              href="#features"
              className="w-full sm:w-auto bg-[white] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00cfff]/90 transition-colors font-medium text-sm sm:text-base block"
            >
              Explore
            </Link>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link
              href="#get-started"
              className="w-full sm:w-auto bg-transparent border-2 border-[#00cfff] text-[#00cfff] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#00cfff]/10 transition-colors font-medium text-sm sm:text-base block"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
