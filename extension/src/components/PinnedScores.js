import useSWR from 'swr'
import { refreshIntervalPinnedScores } from '../constants'
import usePercent from '../hooks/usePercent'
import { fetcher } from '../libs/axios'
import Loading from './Loading'
import ProgressBar from './ProgressBar'
import Score from './Score'

export default function BestPerformance({ config }) {
  const qs = new URLSearchParams(config)
  const { data: pinnedScores, isValidating, mutate } = useSWR(
    `v1/pinned_scores?${qs}`,
    fetcher, {
      refreshInterval: refreshIntervalPinnedScores,
      revalidateOnFocus: false
    }
  )
  const { percent } = usePercent(60 * 60, mutate)

  return (
    <div className="flex flex-col gap-y-1">
      <ProgressBar percent={percent} />

      {isValidating && (
        <Loading />
      )}

      {pinnedScores?.length === 0 && (
        <div>No pinned scores yet.</div>
      )}

      {pinnedScores?.length > 0 && pinnedScores.map(score => (
        <Score key={`pinnedScores:${score.id}`} score={score} />
      ))}
    </div>
  )
}