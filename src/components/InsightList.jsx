export default function InsightList({ title, icon, items, accentColor = 'accent' }) {
  const dotColor = accentColor === 'accent' ? 'bg-accent' : accentColor === 'secondary' ? 'bg-secondary' : 'bg-emerald-400'

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 h-full animate-slide-up">
      <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-4">
        <span>{icon}</span>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
