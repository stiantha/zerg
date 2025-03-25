import Link from "next/link";
import { Github, DiscIcon, Rss, Package } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer-bg py-12 z-10 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Humans */}
          <div>
            <h3 className="footer-heading">Recent posts</h3>
            <ul className="space-y-2">
              <li className="footer-text">
                <span className="accent-text">
                  [ React Clean Architecture ]
                </span>
              </li>
              <li className="footer-text">
                <span className="accent-text">[ 19 Open Source Tools You Can Self-Host ]</span>
              </li>
              <li className="footer-text">
                <span className="accent-text">[ 11 best open source tools for Software Architects ]</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="footer-heading">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Contact
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

        <div className="mt-12 pt-4 border-t border-[#0c7068] text-center text-xs text-text-secondary">
          <p>© Zerg Development 2025.</p>
        </div>
      </div>
    </footer>
  );
}
