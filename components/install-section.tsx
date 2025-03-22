import Image from "next/image"
import CommandBox from "./command-box"

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
    <section className="section z-10">
      <div className="container max-w-4xl">
        <div className="bg-card-bg rounded-lg border border-accent-border p-6 backdrop-blur-sm">
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
                      className="text-accent-color"
                    />
                  </div>
                  <span className="text-accent-color text-sm mt-1">{distro.name}</span>
                </div>

                <div className="flex-1">
                  <CommandBox command={distro.command} note={distro.note} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="border border-accent-border text-text-primary px-4 py-2 rounded hover:bg-accent-color-transparent transition-colors">
              Other options
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

