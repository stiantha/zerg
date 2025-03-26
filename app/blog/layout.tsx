import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { TracingBeam } from "@/components/ui/tracing-beam"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"  

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: 'Blog - Zerg Development',
  description: 'Latest articles and updates',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  )
}