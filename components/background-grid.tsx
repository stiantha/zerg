export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-4 p-4 opacity-20">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border border-cyan-500/30 rounded-lg h-full"></div>
        ))}
      </div>
    </div>
  )
}

