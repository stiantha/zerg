import { cn } from "@/lib/utils"

export default function PreviewSection() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e1e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#232626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  )
}
