"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export const TracingBeam = ({
  className,
}: {
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, height]), {
    stiffness: 500,
    damping: 90,
  })
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, height - 200]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <motion.div ref={ref} className={cn("relative", className)}>
      <svg
        viewBox={`0 0 20 ${height}`}
        width="20"
        height={height}
        className="absolute right-4 block"
        aria-hidden="true"
      >
        <motion.path
          d={`M 1 0V -36 l 18 24 V ${height * 0.8} l -18 24V ${height}`}
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.16"
          transition={{
            duration: 10,
          }}
        />
        <motion.path
          d={`M 1 0V -36 l 18 24 V ${height * 0.8} l -18 24V ${height}`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1.25"
          className="motion-reduce:hidden"
          transition={{
            duration: 10,
          }}
        />
        <defs>
          <motion.linearGradient
            id="gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={y1}
            y2={y2}
          >
            <stop stopColor="#18CCFC" stopOpacity="0" />
            <stop stopColor="#18CCFC" />
            <stop offset="0.325" stopColor="#6344F5" />
            <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

