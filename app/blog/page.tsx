"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readingTime: string;
  category: string;
}

export default function BlogPage() {
  const pathname = usePathname();
  
  // This would normally come from your CMS/database
  const posts: BlogPost[] = []; 

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar/>
      </div>
      <main className="flex-1 flex flex-col w-full mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Blog
              </h1>
              <p className="text-gray-400 max-w-2xl">
                Explore the latest insights about development, learning strategies, and tech innovations.
              </p>
            </div>

            {/* Featured Post */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.slug}
                  className="group"
                >
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    className="relative h-full overflow-hidden rounded-lg border border-[#00ffff]/20 bg-black/50 p-6 backdrop-blur-sm
                             transition-colors hover:border-[#00ffff]/40 hover:bg-black/60"
                  >
                    <div className="flex flex-col h-full space-y-4">
                      <div className="space-y-2">
                        <span className="text-xs text-[#00ffff]/80">{post.category}</span>
                        <h2 className="text-xl font-semibold text-white group-hover:text-[#00ffff]">
                          {post.title}
                        </h2>
                      </div>
                      <p className="text-sm text-gray-400 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none border border-[#00ffff]/10 rounded-lg" />
                  </motion.article>
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-8">
              {['All', 'Development', 'Learning', 'Tech'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm rounded-full border border-[#00ffff]/20 text-[#00ffff]/80
                           hover:bg-[#00ffff]/10 hover:border-[#00ffff]/40 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 