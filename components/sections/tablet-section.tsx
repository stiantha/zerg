"use client"

import { ContainerScroll } from "@/components/ui/tablet-scroll-animation"
import Image from "next/image"
import Zerg from "../../public/zerg-art.jpg"

export default function TabletSection() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
          </>
        }
      >
        <Image
          src={Zerg}
          alt="hero"
          height={720}
          width={1400}
          priority
          loading="eager"
          quality={100}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}

