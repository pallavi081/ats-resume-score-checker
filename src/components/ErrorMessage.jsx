export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <div className="w-full glass-card border border-red-500/30 bg-red-500/10 rounded-xl p-4 flex items-start gap-3 animate-slide-up">
      <span className="text-xl leading-none">⚠️</span>
      <div className="flex-1">
        <p className="text-sm text-red-200 font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-300 hover:text-red-100 text-sm leading-none"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      )}
    </div>
  )
}
