"use client"

import { cn } from "@/lib/utils"
import React from "react"
import { motion } from "framer-motion"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string
    name: string
    title: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  const [start, setStart] = React.useState(false)

  React.useEffect(() => {
    addAnimation()
  }, [])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })
      setStart(true)
    }
  }

  const speedMap = {
    fast: "30s",
    normal: "40s",
    slow: "50s",
  }

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          "--animation-duration": speedMap[speed],
          "--animation-direction": direction === "left" ? "forwards" : "reverse",
        } as React.CSSProperties}
      >
        {items.map((item, idx) => (
          <motion.li
            className="w-[350px] max-w-full relative rounded-2xl border border-teal-500 bg-neutral-950 p-8 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-900), var(--slate-800))",
            }}
            key={item.name + idx}
          >
            <blockquote className="space-y-2">
              <p className="text-lg font-medium leading-snug text-neutral-200">
                {item.quote}
              </p>
            </blockquote>
            <div className="relative z-10 mt-6 flex flex-row items-center">
              <div className="flex flex-col gap-1">
                <span className="text-sm leading-[1.6] text-neutral-400 font-normal">
                  {item.name}
                </span>
                <span className="text-sm leading-[1.6] text-neutral-400 font-normal">
                  {item.title}
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

