export default function EmptyState() {
  return (
    <div className="glass-card rounded-2xl p-10 text-center animate-fade-in">
      <div className="text-5xl mb-4">🧭</div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">
        Ready to check your ATS score?
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
        Upload your resume (PDF or DOCX) and paste a job description above, then click{' '}
        <span className="text-accent font-medium">Analyze Resume</span> to get your
        match score, missing keywords, and personalized improvement tips.
      </p>
    </div>
  )
}
