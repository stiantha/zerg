import Link from "next/link"
import { Github, DiscIcon, Rss, Package } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-blue-950/50 border-t border-cyan-500/20 mt-16 py-12 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Humans */}
          <div>
            <h3 className="text-gray-400 uppercase text-sm font-medium mb-4">Humans</h3>
            <ul className="space-y-2">
              <li className="text-white text-sm">
                Vaxry <span className="text-cyan-400">[ Lead Developer ]</span>
              </li>
              <li className="text-white text-sm">
                Fufexan <span className="text-cyan-400">[ Supporting Developer ]</span>
              </li>
              <li className="text-white text-sm">
                NotAShelf <span className="text-cyan-400">[ Community Manager ]</span>
              </li>
              <li className="text-white text-sm">
                VDawg <span className="text-cyan-400">[ Webdesign and dev ]</span>
              </li>
              <li className="text-white text-sm">
                and our{" "}
                <Link href="#" className="text-cyan-400 hover:underline">
                  fellow contributors
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-400 uppercase text-sm font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
                  Wiki
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
                  Get started
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white text-sm hover:text-cyan-400 transition-colors">
                  Hall of fame
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-gray-400 uppercase text-sm font-medium mb-4">Socials</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
                <DiscIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Rss className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-cyan-400 transition-colors">
                <Package className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-cyan-500/20 text-center text-xs text-gray-400">
          <p>
            Hyprland is licensed under the BSD 3-Clause "New" or "Revised" License. © Hyprland Development 2023. Stay
            hydrated
          </p>
        </div>
      </div>
    </footer>
  )
}

