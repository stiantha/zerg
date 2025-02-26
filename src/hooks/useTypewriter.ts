// src/hooks/useTypewriter.ts
import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed = 20) {
  const [content, setContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const fullContentRef = useRef<string>(text);
  
  useEffect(() => {
    setIsTyping(true);
    setContent("");
    fullContentRef.current = text;
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullContentRef.current.length) {
        setContent(fullContentRef.current.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);
    
    return () => clearInterval(typingInterval);
  }, [text, speed]);
  
  return { content, isTyping };
}
