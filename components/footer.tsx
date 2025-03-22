import Link from "next/link"
import { Github, DiscIcon, Rss, Package } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-border-subtle py-12 z-10 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Humans */}
          <div>
            <h3 className="footer-heading">Humans</h3>
            <ul className="space-y-2">
              <li className="footer-text">
                Vaxry <span className="accent-text">[ Lead Developer ]</span>
              </li>
              <li className="footer-text">
                Fufexan <span className="accent-text">[ Supporting Developer ]</span>
              </li>
              <li className="footer-text">
                NotAShelf <span className="accent-text">[ Community Manager ]</span>
              </li>
              <li className="footer-text">
                VDawg <span className="accent-text">[ Webdesign and dev ]</span>
              </li>
              <li className="footer-text">
                and our{" "}
                <Link href="#" className="accent-text hover:underline">
                  fellow contributors
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="footer-heading">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="footer-link">
                  Wiki
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Get started
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Hall of fame
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="footer-heading">Socials</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="#" className="social-icon">
                <DiscIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="social-icon">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="social-icon">
                <Rss className="h-6 w-6" />
              </Link>
              <Link href="#" className="social-icon">
                <Package className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-border-subtle text-center text-xs text-text-secondary">
          <p>
            Hyprland is licensed under the BSD 3-Clause "New" or "Revised" License. © Hyprland Development 2023. Stay
            hydrated
          </p>
        </div>
      </div>
    </footer>
  )
}

