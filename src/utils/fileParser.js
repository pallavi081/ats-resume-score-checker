import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
import mammoth from 'mammoth'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

/**
 * Extracts raw text from a PDF File object.
 * @param {File} file
 * @returns {Promise<string>}
 */
async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText.trim()
}

/**
 * Extracts raw text from a DOCX File object.
 * @param {File} file
 * @returns {Promise<string>}
 */
async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value.trim()
}

/**
 * Determines file type and routes to the correct extractor.
 * Throws a descriptive error for unsupported types or empty results.
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractResumeText(file) {
  if (!file) {
    throw new Error('No file uploaded. Please upload your resume to continue.')
  }

  const fileName = file.name.toLowerCase()
  const isPDF = fileName.endsWith('.pdf') || file.type === 'application/pdf'
  const isDOCX =
    fileName.endsWith('.docx') ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  if (!isPDF && !isDOCX) {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX resume.')
  }

  const maxSizeBytes = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSizeBytes) {
    throw new Error('File is too large. Please upload a resume under 10MB.')
  }

  let text = ''
  try {
    text = isPDF ? await extractTextFromPDF(file) : await extractTextFromDOCX(file)
  } catch (err) {
    console.error('Extraction error:', err)
    throw new Error(
      'We could not read this file. It may be corrupted, scanned as an image, or password protected.'
    )
  }

  if (!text || text.replace(/\s/g, '').length < 30) {
    throw new Error(
      'We could not extract enough text from this resume. If it is a scanned image, try uploading a text-based PDF or DOCX instead.'
    )
  }

  return text
}
