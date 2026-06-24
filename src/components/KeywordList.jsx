export default function KeywordList({ title, icon, items, variant = 'neutral' }) {
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    danger: 'bg-pink-500/10 text-pink-300 border-pink-500/25',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
  }

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 h-full animate-slide-up">
      <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4">
        <span>{icon}</span>
        {title}
        <span className="text-xs text-slate-500 font-normal">({items.length})</span>
      </h3>
      {items.length === 0 ? (
        <p className="text-xs text-slate-500">Nothing to show here.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className={`text-xs px-3 py-1.5 rounded-full border capitalize ${variantStyles[variant]}`}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
