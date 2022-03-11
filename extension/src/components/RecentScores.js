import useSWR from 'swr'
import { fetcher } from '../libs/axios'
import Score from './Score'

export default function RecentScores({ config }) {
  const qs = new URLSearchParams(config)
  const { data: scores, isValidating } = useSWR(`v1/recent_scores?${qs}`, fetcher)

  if (isValidating) {
    return (
      <div className="flex justify-center">
        <div className="loading" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-1">
      {scores.length === 0 && (
        <div className="text-center">
          <p>No recent scores found.</p>
        </div>
      )}

      {scores.length > 0 && scores.map(score => (
        <Score key={`recentScores:${score.id}`} score={score} />
      ))}
    </div>
  )
}