export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-14 h-14 spinner-gradient" />
      <p className="mt-6 text-slate-300 font-medium tracking-wide">Analyzing Resume...</p>
      <p className="mt-1 text-xs text-slate-500">Comparing keywords, skills, and structure</p>
    </div>
  )
}
