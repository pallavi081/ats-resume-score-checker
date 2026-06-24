function getScoreColor(score) {
  if (score >= 90) return { ring: '#10b981', text: 'text-emerald-400', label: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' }
  if (score >= 70) return { ring: '#8b5cf6', text: 'text-violet-400', label: 'bg-violet-500/15 text-violet-300 border-violet-500/30' }
  if (score >= 40) return { ring: '#f59e0b', text: 'text-amber-400', label: 'bg-amber-500/15 text-amber-300 border-amber-500/30' }
  return { ring: '#ef4444', text: 'text-red-400', label: 'bg-red-500/15 text-red-300 border-red-500/30' }
}

export default function ScoreCard({ score, matchLevel, breakdown }) {
  const colors = getScoreColor(score)
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (score / 100) * circumference

  const breakdownItems = [
    { label: 'Skills Match', value: breakdown.skillsMatchPercent },
    { label: 'Keyword Match', value: breakdown.keywordMatchPercent },
    { label: 'Education Match', value: breakdown.educationMatchPercent },
    { label: 'Experience Match', value: breakdown.experienceMatchPercent },
  ]

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={colors.ring}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${colors.text}`}>{score}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${colors.label}`}>
            {matchLevel}
          </span>
          <h2 className="text-xl font-bold text-slate-100 mt-3">ATS Match Score</h2>
          <p className="text-sm text-slate-500 mt-1">
            Based on skills, keywords, education, and experience alignment.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-5">
            {breakdownItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full btn-gradient rounded-full"
                    style={{ width: `${item.value}%`, transition: 'width 0.8s ease-out' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
