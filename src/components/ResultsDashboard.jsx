import ScoreCard from './ScoreCard'
import KeywordList from './KeywordList'
import InsightList from './InsightList'
import HiringRecommendation from './HiringRecommendation'
import ActionButtons from './ActionButtons'

export default function ResultsDashboard({ results, fileName, onReset }) {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <ActionButtons results={results} fileName={fileName} onReset={onReset} />

      <ScoreCard
        score={results.atsScore}
        matchLevel={results.matchLevel}
        breakdown={results.breakdown}
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <KeywordList
          title="Skills Found"
          icon="🛠️"
          items={results.skillsFound}
          variant="success"
        />
        <KeywordList
          title="Skills Missing"
          icon="🧩"
          items={results.skillsMissing}
          variant="danger"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <KeywordList
          title="Matched Keywords"
          icon="✅"
          items={results.matchedKeywords}
          variant="success"
        />
        <KeywordList
          title="Missing Keywords"
          icon="❌"
          items={results.missingKeywords}
          variant="danger"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <InsightList
          title="Resume Strengths"
          icon="💪"
          items={results.strengths}
          accentColor="accent"
        />
        <InsightList
          title="Improvement Suggestions"
          icon="🚀"
          items={results.suggestions}
          accentColor="secondary"
        />
      </div>

      <InsightList
        title="Resume Weaknesses"
        icon="⚠️"
        items={results.weaknesses}
        accentColor="secondary"
      />

      <HiringRecommendation text={results.hiringRecommendation} score={results.atsScore} />
    </div>
  )
}
