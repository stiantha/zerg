import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TracingBeam } from "@/components/ui/tracing-beam"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Hyprland - Modern Compositor",
  description:
    "Hyprland provides the latest Wayland features, dynamic tiling, all the eyecandy, powerful plugins and much more, while still being lightweight and responsive",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TracingBeam className="fixed right-0 top-0 h-full w-[2px] bg-accent-border z-50 opacity-100" />
        {children}
      </body>
    </html>
  )
}



import './globals.css'