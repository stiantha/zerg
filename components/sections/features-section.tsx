"use client";

import type React from "react";
import { Box, Lock, Search, Sparkles, Code } from "lucide-react";
import { GlowingEffect } from "@/components/ui/bento-grid";
import BoldCopy from "@/components/ui/bold-copy";
import { FaPython, FaReact, FaGitAlt, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiRust } from "react-icons/si";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <div id="features" className="w-full flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
            }
          }}
        >
          <BoldCopy
            text="FEATURES"
            textClassName="leading-none text-white"
            backgroundTextClassName="leading-none text-gray-800 dark:text-gray-700"
            className="bg-transparent mb-8 sm:mb-12 cursor-default"
          />
        </motion.div>
        
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 lg:grid-rows-[repeat(8,minmax(5rem,auto))]">
        <motion.div 
          className="lg:col-span-5 lg:row-span-3"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GridItem
            icon={<Lock className="h-4 w-4 text-teal-400" />}
            title="Learning Path"
            description="Personalized learning paths that adapt to your skill level and pace, ensuring you're always challenged but never overwhelmed."
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.75), rgba(4, 47, 61, 0.85)), url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80')"
          />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-7 lg:row-span-3"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GridItem
            icon={<Sparkles className="h-4 w-4 text-teal-400" />}
            title="Gamified Learning Experience"
            description="Transform coding education into an engaging adventure with interactive challenges, rewards, and competitive elements that make learning feel like playing a game."
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.75), rgba(4, 47, 61, 0.85)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')"
          />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-7 lg:row-span-3"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GridItem
            icon={<Code className="h-4 w-4 text-teal-400" />}
            title="Variety of Skills"
            description={
              <div className="space-y-4">
                <p>Master a wide range of in-demand programming languages and technologies through our comprehensive curriculum.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <TechIcon icon={<FaPython className="h-6 w-6" />} name="Python" />
                  <TechIcon icon={<SiTypescript className="h-6 w-6" />} name="TypeScript" />
                  <TechIcon icon={<FaReact className="h-6 w-6" />} name="React" />
                  <TechIcon icon={<FaGitAlt className="h-6 w-6" />} name="Git" />
                  <TechIcon icon={<FaNodeJs className="h-6 w-6" />} name="Node.js" />
                  <TechIcon icon={<SiRust className="h-6 w-6" />} name="Rust" />
                  <TechIcon icon={<FaDatabase className="h-6 w-6" />} name="Databases" />
                  <TechIcon icon={<SiJavascript className="h-6 w-6" />} name="JavaScript" />
                </div>
              </div>
            }
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.8), rgba(4, 47, 61, 0.9)), url('https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"
          />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-5 lg:row-span-3"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GridItem
            icon={<Search className="h-4 w-4 text-teal-400" />}
            title="Microlearning Approach"
            description="Bite-sized coding modules designed for maximum retention and rapid skill acquisition, allowing you to master complex concepts in days rather than weeks."
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.75), rgba(4, 47, 61, 0.85)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
          />
        </motion.div>
      </div>
    </div>
  );
}

interface TechIconProps {
  icon: React.ReactNode;
  name: string;
}

const TechIcon = ({ icon, name }: TechIconProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-1"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-white hover:bg-teal-500/20 transition-colors">
        {icon}
      </div>
      <span className="text-xs text-white font-medium">{name}</span>
    </motion.div>
  );
};

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  backgroundImage: string;
}

const GridItem = ({ icon, title, description, backgroundImage }: GridItemProps) => {
  return (
    <div className="group relative h-full">
      <div
        className="relative h-full rounded-2xl sm:rounded-2.5xl border border-teal-500/20 p-2 md:p-3 bg-teal-900/10 backdrop-blur-sm transition-colors duration-300 hover:bg-teal-900/20"
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div 
          className="relative flex h-full flex-col gap-4 sm:gap-6 overflow-hidden rounded-xl border-0.75 p-4 sm:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-cover bg-center"
          style={{ backgroundImage }}
        >
          <div className="bg-black/20 backdrop-blur-[2px] absolute inset-0 rounded-xl pointer-events-none" />
          <div className="flex flex-col gap-3 relative z-10">
            <div className="w-fit rounded-lg border border-teal-500/40 p-2 bg-teal-900/40 backdrop-blur-md transition-colors duration-300 group-hover:bg-teal-900/50">
              {icon}
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold font-sans -tracking-4 text-balance text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {title}
              </h3>
              <div className="text-sm sm:text-base text-white font-medium leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};