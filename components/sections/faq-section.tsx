"use client";

import Link from "next/link";
import BoldCopy from "@/components/ui/bold-copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef } from "react";

const faq = [
    {
      question: "What is zerg.dev?",
      answer: "zerg.dev is an innovative game-based learning platform designed to help you master coding rapidly. It's inspired by the Zerg mentality from StarCraft, focusing on fast-paced skill acquisition and evolution in software development.",
    },
    {
      question: "Who is this platform for?",
      answer: "zerg.dev is for anyone looking to learn coding quickly and efficiently. Whether you're a beginner starting your coding journey or an experienced developer wanting to level up your skills, our platform is designed to accelerate your learning process.",
    },
    {
      question: "How much does it cost?",
      answer: "100% Free. We believe in making quality coding education accessible to everyone.",
    },
    {
      question: "What makes zerg.dev different from other coding guides?",
      answer: "zerg.dev stands out with its game-based learning approach and focus on rapid skill acquisition. Inspired by the Zerg race from StarCraft, we emphasize quick evolution of your coding abilities, allowing you to learn faster than traditional methods.",
    },
    {
      question: "What kind of skills can I learn?",
      answer: "Our platform covers a wide range of development skills. You can master various programming languages, frameworks, and technologies essential for modern software development.",
    },
    {
      question: "How do I get started?",
      answer: (
        <span>
          Getting started is easy! Simply sign up on our website, choose your learning path, and dive into our interactive coding challenges. Check out our{" "}
          <Link className="text-blue-500 hover:text-blue-700" href="/docs">
            documentation
          </Link>{" "}
          for more detailed instructions on how to begin your journey.
        </span>
      ),
    },
  ];
  

  function FaqItem({ index }: { index: number }) {
    const item = faq[index];
    const contentRef = useRef(null);
    
    return (
      <AccordionItem value={`question-${index}`} className="w-full border-b border-gray-800">
        <AccordionTrigger className="w-full py-3 sm:py-4 flex justify-between items-center text-left">
          <span className="inline-block text-xl sm:text-xl font-medium text-white">
            {item.question}
          </span>
        </AccordionTrigger>
        <AccordionContent 
          className="overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div 
            ref={contentRef}
            className="text-gray-300 py-3 sm:py-4 text-sm sm:text-xl"
          >
            {item.answer}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  
  

export default function FAQSection() {
  return (
    <div
      className="relative"
      style={{
        backgroundSize: "calc(10px) calc(10px)",
      }}
    >
      <div className="absolute inset-0 left-1/2 z-0 aspect-square h-[120%] -translate-x-1/2 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 blur-3xl dark:from-gray-900 dark:to-teal-900" />
      <div className="mx-auto flex max-w-xl flex-col gap-4 py-8 sm:py-12 md:py-20 min-h-screen">
        <BoldCopy
          text="FAQ"
          textClassName="leading-none text-white"
          backgroundTextClassName="leading-none text-gray-800 dark:text-gray-700"
          className="bg-transparent mb-8 sm:mb-12 cursor-default"
        />

        <Accordion collapsible type="single" className="relative">
          {faq.map((_, index) => {
            return <FaqItem key={`item-${index}`} index={index} />;
          })}
        </Accordion>
      </div>
    </div>
  );
}
