import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ResumeUpload from './components/ResumeUpload'
import JobDescriptionInput from './components/JobDescriptionInput'
import LoadingAnimation from './components/LoadingAnimation'
import EmptyState from './components/EmptyState'
import ErrorMessage from './components/ErrorMessage'
import ResultsDashboard from './components/ResultsDashboard'
import { extractResumeText } from './utils/fileParser'
import { analyzeResume } from './utils/atsAnalyzer'

function App() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setError('')
  }

  const handleAnalyze = async () => {
    setError('')

    if (!file) {
      setError('Please upload your resume (PDF or DOCX) before analyzing.')
      return
    }

    if (!jobDescription || jobDescription.trim().length < 30) {
      setError('Please paste a complete job description (at least a few sentences) before analyzing.')
      return
    }

    setIsAnalyzing(true)
    setResults(null)

    try {
      const resumeText = await extractResumeText(file)
      // Small delay so the loading animation is perceptible even on fast devices
      await new Promise((resolve) => setTimeout(resolve, 600))
      const analysis = analyzeResume(resumeText, jobDescription)
      setResults(analysis)
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing your resume. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setJobDescription('')
    setResults(null)
    setError('')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0f172a' }}>
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(circle at 15% 10%, rgba(139,92,246,0.15), transparent 40%), radial-gradient(circle at 85% 90%, rgba(236,72,153,0.12), transparent 40%)',
        }}
      />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <Header />

        <section className="space-y-6">
          <ResumeUpload file={file} onFileSelect={handleFileSelect} disabled={isAnalyzing} />
          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
            disabled={isAnalyzing}
          />

          <ErrorMessage message={error} onDismiss={() => setError('')} />

          <div className="flex justify-center pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-xl text-sm sm:text-base
                disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </section>

        <div className="mt-10">
          {isAnalyzing && <LoadingAnimation />}
          {!isAnalyzing && !results && <EmptyState />}
          {!isAnalyzing && results && (
            <ResultsDashboard results={results} fileName={file?.name} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
