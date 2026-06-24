export default function HiringRecommendation({ text, score }) {
  let emoji = '🔴'
  if (score >= 90) emoji = '🟢'
  else if (score >= 70) emoji = '🟣'
  else if (score >= 40) emoji = '🟡'

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 animate-slide-up border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, #8b5cf6, transparent 60%)' }}
      />
      <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3 relative z-10">
        <span>{emoji}</span>
        Hiring Recommendation
      </h3>
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed relative z-10">{text}</p>
    </div>
  )
}
