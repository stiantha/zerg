"use client"

import { Copy } from "lucide-react"
import { useState } from "react"

interface CommandBoxProps {
  command: string
  note?: string
}

export default function CommandBox({ command, note }: CommandBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="command-box">
        <div className="flex items-center">
          <span className="command-prompt">$</span>
          <code className="command-text">{command}</code>
        </div>
        <button className="copy-button" onClick={handleCopy} title={copied ? "Copied!" : "Copy to clipboard"}>
          <Copy className="h-4 w-4" />
        </button>
      </div>
      {note && <p className="text-xs text-text-secondary mt-1">{note}</p>}
    </div>
  )
}

