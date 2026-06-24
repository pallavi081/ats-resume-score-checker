import { useRef, useState } from 'react'

export default function ResumeUpload({ file, onFileSelect, disabled }) {
  const inputRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFiles = (fileList) => {
    if (fileList && fileList.length > 0) {
      onFileSelect(fileList[0])
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        1. Upload Your Resume
      </label>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`dropzone glass-card rounded-2xl p-8 text-center cursor-pointer border-2 border-dashed
          ${isDragOver ? 'dragover border-accent' : 'border-white/10'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent/60'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">✅</span>
            <p className="text-slate-200 font-medium break-all">{file.name}</p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024).toFixed(1)} KB — click to replace
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl mb-1">📤</span>
            <p className="text-slate-200 font-medium">
              Drag &amp; drop your resume here, or{' '}
              <span className="text-accent underline">browse</span>
            </p>
            <p className="text-xs text-slate-500">Supports PDF and DOCX • Max 10MB</p>
          </div>
        )}
      </div>
    </div>
  )
}
