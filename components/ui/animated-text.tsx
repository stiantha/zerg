"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "",
  once = true,
  delay = 0.1
}) => {
  // Split text into words
  const words = text.split(" ");
  
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay * i,
        ease: [0.215, 0.61, 0.355, 1]
      },
    }),
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  
  // Child (word) animation
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    }
  };
  
  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em] whitespace-nowrap"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText; 