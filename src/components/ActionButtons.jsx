import { useState } from 'react'
import { downloadReportAsTxt, copyReportToClipboard } from '../utils/reportGenerator'

export default function ActionButtons({ results, fileName, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyReportToClipboard(results, { fileName, analyzedAt: new Date() })
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    downloadReportAsTxt(results, { fileName, analyzedAt: new Date() })
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-end animate-slide-up">
      <button
        onClick={handleCopy}
        className="glass-card border border-white/10 hover:border-white/25 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
      >
        <span>{copied ? '✅' : '📋'}</span>
        {copied ? 'Copied!' : 'Copy Results'}
      </button>
      <button
        onClick={handleDownload}
        className="glass-card border border-white/10 hover:border-white/25 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
      >
        <span>⬇️</span>
        Download Report
      </button>
      <button
        onClick={onReset}
        className="btn-gradient text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2"
      >
        <span>🔄</span>
        Reset
      </button>
    </div>
  )
}
