import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <main className="flex-1 flex flex-col w-full">
      <Navbar />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-4xl w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert prose-cyan max-w-none"
        >
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Article Title
            </h1>
            <div className="flex items-center gap-4 text-gray-400">
              <time>March 26, 2024</time>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
          
          {/* Article content would go here */}
          <div className="space-y-6">
            <p>Article content...</p>
          </div>
        </motion.div>
      </article>
    </main>
  );
} 