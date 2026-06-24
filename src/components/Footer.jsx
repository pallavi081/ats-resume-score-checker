export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-white/10 py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
        <div>
          <p className="text-slate-300 text-sm">
            <span className="text-slate-500">Full Name:</span>{' '}
            <span className="font-semibold text-slate-100">Pallavi Kumari</span>
          </p>
          <p className="text-slate-300 text-sm mt-1">
            <span className="text-slate-500">Email:</span>{' '}
            <span className="font-semibold text-slate-100">shripallavi3108@gmail.comss</span>
          </p>
        </div>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient text-white text-sm font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2"
        >
          Built for Digital Heroes
        </a>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} ATS Resume Score Checker. All processing happens locally in your browser.
        </p>
      </div>
    </footer>
  )
}
