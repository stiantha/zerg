import Image from "next/image"
import { Copy } from "lucide-react"

const distros = [
  {
    name: "Arch",
    logo: "/placeholder.svg?height=48&width=48",
    command: "pacman -S hyprland",
    note: "AUR git version: hyprland-git",
  },
  {
    name: "NixOS",
    logo: "/placeholder.svg?height=48&width=48",
    command: "programs.hyprland.enable",
    note: "See more details and git version ⭐",
  },
  {
    name: "FreeBSD",
    logo: "/placeholder.svg?height=48&width=48",
    command: "pkg install hyprland",
  },
  {
    name: "openSUSE",
    logo: "/placeholder.svg?height=48&width=48",
    command: "zypper in hyprland",
    note: 'or install "hyprland" via YaST Software.',
  },
]

export default function InstallSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 z-10">
      <div className="bg-blue-900/30 rounded-lg border border-cyan-500/30 p-6 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-6">
          {distros.map((distro) => (
            <div key={distro.name} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={distro.logo || "/placeholder.svg"}
                    alt={`${distro.name} logo`}
                    width={48}
                    height={48}
                    className="text-cyan-400"
                  />
                </div>
                <span className="text-cyan-400 text-sm mt-1">{distro.name}</span>
              </div>

              <div className="flex-1">
                <div className="bg-blue-950 rounded border border-cyan-500/30 p-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-cyan-400 mr-2">$</span>
                    <code className="text-white text-sm">{distro.command}</code>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {distro.note && <p className="text-xs text-gray-400 mt-1">{distro.note}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="border border-cyan-500/50 text-white px-4 py-2 rounded hover:bg-cyan-500/10 transition-colors">
            Other options
          </button>
        </div>
      </div>
    </section>
  )
}

