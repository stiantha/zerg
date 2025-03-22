"use client"

import { Copy } from "lucide-react"

interface CommandBoxProps {
  command: string
  note?: string
}

export default function CommandBox({ command, note }: CommandBoxProps) {
  return (
    <div>
      <div className="bg-blue-950 rounded border border-cyan-500/30 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-cyan-400 mr-2">$</span>
          <code className="text-white text-sm">{command}</code>
        </div>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={() => navigator.clipboard.writeText(command)}
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
      {note && <p className="text-xs text-gray-400 mt-1">{note}</p>}
    </div>
  )
}

