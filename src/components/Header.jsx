export default function Header() {
  return (
    <header className="w-full text-center pt-12 pb-8 px-4 animate-fade-in">
      <div className="inline-flex items-center justify-center gap-2 mb-4">
        <span className="text-3xl">📄</span>
        <span className="text-3xl">⚡</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
        <span className="gradient-text">ATS Resume Score Checker</span>
      </h1>
      <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Check how well your resume matches a job description and improve your ATS score instantly.
      </p>
    </header>
  )
}
