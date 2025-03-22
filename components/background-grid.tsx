export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 grid grid-cols-100 md:grid-cols-100 gap-8 p-8 opacity-10">
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className="border border-[#00cfff]/30 rounded-lg h-full"></div>
        ))}
      </div>
    </div>
  )
}

