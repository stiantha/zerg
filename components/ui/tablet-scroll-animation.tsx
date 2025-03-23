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
    return isMobile ? [0.6, 0.95] : [0.8, 1.5]
  }

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [30, 15, 0])
  const scale = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], [...scaleDimensions(), 122, 1])
  const translate = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, -30, -70, -50])
  const opacity = useTransform(scrollYProgress, [0, 1, 1, 1], [0.3, 1, 1, 1])
  const glow = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [
      "0 0 20px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 255, 255, 0.1), 0 0 20px rgba(0, 255, 255, 0.05)",
      "0 0 30px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 255, 255, 0.2), 0 0 30px rgba(0, 255, 255, 0.1)",
      "0 0 50px rgba(0, 255, 255, 0.5), 0 0 50px rgba(0, 255, 255, 0.3), 0 0 50px rgba(0, 255, 255, 0.2)",
      "0 0 40px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2), 0 0 40px rgba(0, 255, 255, 0.1)",
    ]
  )
  
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 50])

  return (
    <motion.div 
      ref={containerRef}
      className="h-[70rem] md:h-[90rem] flex items-center justify-center p-10 md:p-32"
      style={{ 
        position: "relative",
      }}
    >
      <div
        className="w-full"
        style={{
          perspective: "2000px",
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
        >
          {children}
        </Card>
      </div>
    </motion.div>
  )
}

export const Header = ({ translate, opacity, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity,
      }}
      className="div max-w-5xl mx-auto text-center"
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
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  translateZ: MotionValue<number>
  opacity: MotionValue<number>
  glow: MotionValue<string>
  scrollYProgress: MotionValue<number>
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
      }}
      className="max-w-5xl -mt-12 mx-auto h-[40rem] md:h-[40rem] w-full border-4 border-[#00ffff] p-1 rounded-[30px]"
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
        className="h-full w-full overflow-hidden rounded-2xl relative"
        style={{
          background: "linear-gradient(180deg, rgba(0,255,255,0.03) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 100%)",
            opacity: 1,
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  )
}