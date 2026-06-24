export default function JobDescriptionInput({ value, onChange, disabled }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        2. Paste the Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste the full job description here — including required skills, qualifications, and responsibilities..."
        rows={8}
        className="glass-card w-full rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500
          border border-white/10 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40
          resize-none transition-colors disabled:opacity-50"
      />
      <div className="flex justify-end mt-1.5">
        <span className="text-xs text-slate-500">{value.length} characters</span>
      </div>
    </div>
  )
}
