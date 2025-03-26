"use client"
import React, { useRef } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.9] : [1, 1.4]
  }

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], 
    isMobile ? [5, 2, 0] : [20, 10, 0]
  )
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.7, 0.85, 1], 
    [...scaleDimensions(), isMobile ? 1.05 : 1.2, isMobile ? 1.05 : 1.2]
  )
  const translate = useTransform(
    scrollYProgress, 
    [0, 0.5, 0.8, 1], 
    isMobile ? [0, -5, -10, -10] : [0, -15, -30, -30]
  )
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1])
  const glow = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    isMobile ? 
    [
      "0 0 10px rgba(0, 255, 255, 0.2)",
      "0 0 15px rgba(0, 255, 255, 0.3)",
      "0 0 20px rgba(0, 255, 255, 0.4)",
      "0 0 20px rgba(0, 255, 255, 0.4)",
    ] :
    [
      "0 0 20px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.1)",
      "0 0 30px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2)",
      "0 0 40px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.3)",
      "0 0 40px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.3)",
    ]
  )
  
  const translateZ = useTransform(
    scrollYProgress, 
    [0, 0.5, 0.85, 1], 
    isMobile ? [-5, 0, 2, 2] : [-30, 0, 10, 10]
  )

  return (
    <div className="w-full flex justify-center" style={{ margin: "0 auto", transformStyle: "preserve-3d" }}>
      <motion.div 
        ref={containerRef}
        className="w-full flex items-center justify-center"
        style={{ 
          position: "relative",
          padding: isMobile ? "0.5rem" : "1rem",
          transformStyle: "preserve-3d"
        }}
      >
        <div
          className="w-full"
          style={{
            perspective: isMobile ? "400px" : "2000px",
            transformStyle: "preserve-3d"
          }}
        >
          <Header 
            translate={translate} 
            opacity={opacity} 
            titleComponent={titleComponent} 
          />
          <Card 
            rotate={rotate} 
            translate={translate} 
            translateZ={translateZ}
            scale={scale} 
            opacity={opacity}
            glow={glow}
            scrollYProgress={scrollYProgress}
            isMobile={isMobile}
          >
            {children}
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

export const Header = ({ translate, opacity, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity,
        transformStyle: "preserve-3d"
      }}
      className="div max-w-5xl mx-auto text-center px-2 w-full"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  translate,
  translateZ,
  opacity,
  glow,
  scrollYProgress,
  isMobile,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  translateZ: MotionValue<number>
  opacity: MotionValue<number>
  glow: MotionValue<string>
  scrollYProgress: MotionValue<number>
  isMobile?: boolean
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
        boxShadow: glow,
        translateY: translate,
        translateZ: translateZ,
        transition: "all 0.1s cubic-bezier(0.17, 0.55, 0.55, 1)",
        maxWidth: "100%",
        willChange: "transform",
        transformStyle: "preserve-3d"
      }}
      className={`mx-auto ${
        isMobile 
          ? "h-[26rem]" 
          : "h-[30rem] sm:h-[35rem] md:h-[40rem] lg:h-[45rem]"
      } w-full border-2 sm:border-4 border-[#00ffff] rounded-xl`}
      whileInView={{
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
    >
      <motion.div 
        className="h-full w-full rounded-lg sm:rounded-xl relative"
        style={{
          background: "linear-gradient(180deg, rgba(0,255,255,0.03) 0%, rgba(0,0,0,0) 100%)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Glow overlay - simplified for mobile */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isMobile 
              ? "radial-gradient(circle at center, rgba(0, 255, 255, 0.05) 0%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 100%)",
            opacity: 1,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  )
}