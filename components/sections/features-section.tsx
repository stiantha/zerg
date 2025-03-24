"use client";

import type React from "react";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/bento-grid";
import BoldCopy from "@/components/ui/bold-copy";

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full px-4 sm:px-6 lg:px-8">
      <BoldCopy
        text="FEATURES"
        textClassName="leading-none text-white"
        backgroundTextClassName="leading-none text-gray-800 dark:text-gray-700"
        className="bg-transparent mb-8 sm:mb-12"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 lg:grid-rows-[repeat(3,minmax(180px,1fr))] lg:max-h-[34rem]">
        <GridItem
          area="lg:col-[1/6] lg:row-span-2"
          icon={<Lock className="h-4 w-4 text-teal-400" />}
          title="Learning Path"
          description="Personalized learning paths that adapt to your skill level and pace, ensuring you're always challenged but never overwhelmed."
        />
        <GridItem
          area="lg:col-[6/13] lg:row-span-2"
          icon={<Sparkles className="h-4 w-4 text-teal-400" />}
          title="Gamified Learning Experience"
          description="Transform coding education into an engaging adventure with interactive challenges, rewards, and competitive elements that make learning feel like playing."
        />
        <GridItem
          area="lg:col-[1/8] lg:row-span-4"
          icon={<Search className="h-4 w-4 text-teal-400" />}
          title="Rewards"
          description="Receive various items as a token for your hard work aquiring new skills"
        />
        <GridItem
          area="lg:col-[8/13] lg:row-span-4"
          icon={<Search className="h-4 w-4 text-teal-400" />}
          title="Microlearning Approach"
          description="Bite-sized coding modules designed for maximum retention and rapid skill acquisition, allowing you to master complex concepts in minutes rather than hours."
        />
      </div>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <div className={`group relative ${area}`}>
      <div className="relative h-full rounded-2xl sm:rounded-2.5xl border border-teal-500/20 p-2 md:p-3 bg-teal-900/10 backdrop-blur-sm transition-colors duration-300 hover:bg-teal-900/20">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col gap-4 sm:gap-6 overflow-hidden rounded-xl border-0.75 p-4 sm:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="flex flex-col gap-3">
            <div className="w-fit rounded-lg border border-teal-500/20 p-2 bg-teal-500/5 transition-colors duration-300 group-hover:bg-teal-500/10">
              {icon}
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold font-sans -tracking-4 text-balance text-white">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 line-clamp-3 sm:line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
