import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TracingBeam } from "@/components/ui/tracing-beam"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Zerg Development",
  description: "Supercharge development learning speed",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        <TracingBeam className="fixed right-0 top-0 h-full bg-accent-border z-40 opacity-100" />
        {children}
      </body>
    </html>
  )
}
