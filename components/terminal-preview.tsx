export default function TerminalPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-auto px-4 pb-8 z-10">
      <div className="relative overflow-hidden rounded-lg border border-[#00cfff]/30 shadow-[0_0_15px_rgba(0,207,255,0.15)]">
        <div className="bg-black/30 rounded-t-lg border-b border-[#00cfff]/30 h-8 w-full flex items-center px-3">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="h-40 bg-black/50"></div>
      </div>
    </div>
  )
} 