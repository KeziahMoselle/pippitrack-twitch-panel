import useSWR from 'swr'
import usePercent from '../hooks/usePercent'
import { fetcher } from '../libs/axios'
import Loading from './Loading'
import ProgressBar from './ProgressBar'
import Score from './Score'

export default function RecentScores({ config }) {
  const qs = new URLSearchParams(config)
  const { data: scores, isValidating, mutate } = useSWR(
    `v1/recent_scores?${qs}`,
    fetcher, {
      revalidateOnFocus: false
    }
  )
  const { percent } = usePercent(30, mutate)

  return (
    <div className="flex flex-col gap-y-1">
      <ProgressBar percent={percent} />

      {isValidating && (
        <Loading />
      )}

      {scores?.length === 0 && (
        <div className="text-center">
          <p>No recent scores found.</p>
        </div>
      )}

      {scores?.length > 0 && scores.map(score => (
        <Score key={`recentScores:${score.id}`} score={score} />
      ))}
    </div>
  )
}