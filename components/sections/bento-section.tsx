"use client";

import type React from "react";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/bento-grid";

export default function GlowingEffectDemo() {
  return (
    <div className="w-5em">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-20 uppercase text-center">
        Features
      </h1>
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:2/1/2/4] xl:[grid-area:1/3/3/5]"
          icon={<Lock className="h-4 w-4 text-teal-400" />}
          title="Secure Learning Path"
          description="Personalized learning paths that adapt to your skill level and pace, ensuring you're always challenged but never overwhelmed."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/5/2/8]"
          icon={<Search className="h-4 w-4 text-teal-400" />}
          title="Intelligent Code Analysis"
          description="Real-time feedback and code evaluation that identifies errors, suggests optimizations, and helps you develop professional coding habits from day one."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/5/2/11]"
          icon={<Sparkles className="h-4 w-4 text-teal-400" />}
          title="Gamified Learning Experience"
          description="Transform coding education into an engaging adventure with interactive challenges, rewards, and competitive elements that make learning feel like playing."
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/2/11]"
          icon={<Search className="h-4 w-4 text-teal-400" />}
          title="Microlearning Approach"
          description="Bite-sized coding modules designed for maximum retention and rapid skill acquisition, allowing you to master complex concepts in minutes rather than hours."
        />
      </ul>
    </div>
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
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border border-teal-500/20 p-2 md:rounded-3xl md:p-3 bg-teal-900/10 backdrop-blur-sm">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-teal-500/20 p-2 bg-teal-500/5">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
