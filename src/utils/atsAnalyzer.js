import {
  SKILL_DICTIONARY,
  STOP_WORDS,
  EDUCATION_KEYWORDS,
  EXPERIENCE_KEYWORDS,
} from './skillsDictionary'

/** Normalizes text: lowercase, strip extra whitespace/punctuation noise. */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[\r\n]+/g, ' ')
    .replace(/[^\w\s+./#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Splits normalized text into individual word tokens. */
function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

/** Checks whether a phrase (single or multi-word) appears in normalized text. */
function containsPhrase(normalizedText, phrase) {
  const normalizedPhrase = normalize(phrase)
  if (!normalizedPhrase) return false
  // Use word-boundary-ish matching so "go" doesn't match inside "good"
  const escaped = normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`)
  return pattern.test(` ${normalizedText} `)
}

/** Extracts meaningful keywords from a job description using frequency + dictionary matching. */
function extractKeywordsFromJD(jdText) {
  const normalizedJD = normalize(jdText)
  const tokens = tokenize(jdText)

  // Frequency map for single-word tokens
  const freq = {}
  tokens.forEach((word) => {
    freq[word] = (freq[word] || 0) + 1
  })

  // Pull out frequent, meaningful single words (appearing 2+ times, or any noun-like word)
  const frequentWords = Object.entries(freq)
    .filter(([word, count]) => count >= 1 && word.length > 2)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)

  // Dictionary skills explicitly present in the JD
  const dictionarySkillsInJD = SKILL_DICTIONARY.filter((skill) =>
    containsPhrase(normalizedJD, skill)
  )

  // Combine: dictionary skills first (highest signal), then frequent unique words
  const combinedSet = new Set([...dictionarySkillsInJD])
  frequentWords.forEach((word) => {
    if (combinedSet.size < 40) combinedSet.add(word)
  })

  return {
    keywords: Array.from(combinedSet),
    dictionarySkills: dictionarySkillsInJD,
  }
}

/** Core analysis function: compares resume text against a job description. */
export function analyzeResume(resumeText, jobDescriptionText) {
  const normalizedResume = normalize(resumeText)
  const { keywords: jdKeywords, dictionarySkills: jdSkills } =
    extractKeywordsFromJD(jobDescriptionText)

  // --- Keyword matching ---
  const matchedKeywords = []
  const missingKeywords = []

  jdKeywords.forEach((keyword) => {
    if (containsPhrase(normalizedResume, keyword)) {
      matchedKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })

  const keywordMatchRatio =
    jdKeywords.length > 0 ? matchedKeywords.length / jdKeywords.length : 0

  // --- Skills matching (dictionary-based, higher weight) ---
  const skillsFound = []
  const skillsMissing = []

  jdSkills.forEach((skill) => {
    if (containsPhrase(normalizedResume, skill)) {
      skillsFound.push(skill)
    } else {
      skillsMissing.push(skill)
    }
  })

  const skillsMatchRatio =
    jdSkills.length > 0 ? skillsFound.length / jdSkills.length : keywordMatchRatio

  // --- Education match ---
  const resumeHasEducation = EDUCATION_KEYWORDS.some((kw) =>
    containsPhrase(normalizedResume, kw)
  )
  const jdMentionsEducation = EDUCATION_KEYWORDS.some((kw) =>
    containsPhrase(normalize(jobDescriptionText), kw)
  )
  let educationScore
  if (jdMentionsEducation) {
    educationScore = resumeHasEducation ? 1 : 0
  } else {
    educationScore = resumeHasEducation ? 1 : 0.6
  }

  // --- Experience-related keyword match ---
  const experienceMatches = EXPERIENCE_KEYWORDS.filter((kw) =>
    containsPhrase(normalizedResume, kw)
  )
  const experienceScore = Math.min(experienceMatches.length / 6, 1)

  // --- Weighted final score ---
  const weights = {
    skills: 0.4,
    keywords: 0.3,
    education: 0.1,
    experience: 0.2,
  }

  const rawScore =
    skillsMatchRatio * weights.skills +
    keywordMatchRatio * weights.keywords +
    educationScore * weights.education +
    experienceScore * weights.experience

  const atsScore = Math.round(Math.min(Math.max(rawScore * 100, 0), 100))

  // --- Match level label ---
  let matchLevel
  if (atsScore >= 90) matchLevel = 'Excellent Match'
  else if (atsScore >= 70) matchLevel = 'Strong Match'
  else if (atsScore >= 40) matchLevel = 'Moderate Match'
  else matchLevel = 'Poor Match'

  // --- Strengths ---
  const strengths = []
  if (skillsFound.length > 0) {
    strengths.push(
      `Your resume includes ${skillsFound.length} key skill${
        skillsFound.length > 1 ? 's' : ''
      } that match this job description, including ${skillsFound
        .slice(0, 5)
        .join(', ')}.`
    )
  }
  if (resumeHasEducation) {
    strengths.push('Your resume clearly states your educational qualifications.')
  }
  if (experienceMatches.length >= 3) {
    strengths.push(
      'Your resume uses strong action-oriented language that highlights real experience.'
    )
  }
  if (keywordMatchRatio >= 0.5) {
    strengths.push(
      'A solid portion of the job description\'s important terms already appear in your resume.'
    )
  }
  if (strengths.length === 0) {
    strengths.push(
      'Your resume was successfully parsed, but few overlapping terms were found with this job description.'
    )
  }

  // --- Weaknesses ---
  const weaknesses = []
  if (skillsMissing.length > 0) {
    weaknesses.push(
      `Missing ${skillsMissing.length} relevant skill${
        skillsMissing.length > 1 ? 's' : ''
      } mentioned in the job description, such as ${skillsMissing
        .slice(0, 5)
        .join(', ')}.`
    )
  }
  if (!resumeHasEducation && jdMentionsEducation) {
    weaknesses.push('The job description references education requirements that aren\'t clearly visible in your resume.')
  }
  if (experienceMatches.length < 3) {
    weaknesses.push(
      'Your resume could use more action verbs (e.g., led, built, managed, delivered) to better demonstrate experience.'
    )
  }
  if (keywordMatchRatio < 0.4) {
    weaknesses.push(
      'Many important keywords from the job description are not present in your resume, which may lower ATS visibility.'
    )
  }
  if (weaknesses.length === 0) {
    weaknesses.push('No major weaknesses detected — your resume aligns well with this job description.')
  }

  // --- Suggestions ---
  const suggestions = []
  if (skillsMissing.length > 0) {
    suggestions.push(
      `Add these missing skills if you genuinely have them: ${skillsMissing
        .slice(0, 6)
        .join(', ')}.`
    )
  }
  if (missingKeywords.length > 0) {
    suggestions.push(
      `Naturally weave in these missing keywords from the job description: ${missingKeywords
        .slice(0, 8)
        .join(', ')}.`
    )
  }
  if (experienceScore < 0.5) {
    suggestions.push(
      'Use stronger action verbs and quantify your achievements (e.g., "increased efficiency by 20%").'
    )
  }
  if (!resumeHasEducation && jdMentionsEducation) {
    suggestions.push('Clearly list your degree, institution, and graduation year near the top of your resume.')
  }
  suggestions.push('Tailor your resume for each job application to maximize ATS keyword alignment.')
  suggestions.push('Use a clean, single-column format without tables or images, as some ATS systems cannot parse them.')

  // --- Hiring recommendation ---
  let hiringRecommendation
  if (atsScore >= 90) {
    hiringRecommendation =
      'Excellent alignment with this role. This resume is highly likely to pass ATS filtering and reach a human recruiter.'
  } else if (atsScore >= 70) {
    hiringRecommendation =
      'Strong alignment with this role. Minor tweaks to missing keywords could push this resume even higher.'
  } else if (atsScore >= 40) {
    hiringRecommendation =
      'Moderate alignment. Consider revising the resume to better reflect the skills and language used in the job description before applying.'
  } else {
    hiringRecommendation =
      'Low alignment with this role. Significant revisions are recommended — focus on adding missing skills, keywords, and relevant experience.'
  }

  return {
    atsScore,
    matchLevel,
    matchedKeywords: matchedKeywords.slice(0, 30),
    missingKeywords: missingKeywords.slice(0, 30),
    skillsFound,
    skillsMissing,
    strengths,
    weaknesses,
    suggestions,
    hiringRecommendation,
    breakdown: {
      skillsMatchPercent: Math.round(skillsMatchRatio * 100),
      keywordMatchPercent: Math.round(keywordMatchRatio * 100),
      educationMatchPercent: Math.round(educationScore * 100),
      experienceMatchPercent: Math.round(experienceScore * 100),
    },
  }
}
