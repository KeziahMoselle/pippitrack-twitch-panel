import useSWR from 'swr'
import usePercent from '../hooks/usePercent'
import { fetcher } from '../libs/axios'
import Loading from './Loading'
import ProgressBar from './ProgressBar'
import Score from './Score'

export default function BestPerformance({ config }) {
  const qs = new URLSearchParams(config)
  const { data: bestPerformance, isValidating, mutate } = useSWR(
    `v1/top_plays?${qs}`,
    fetcher, {
      refreshInterval: 1000 * 60 * 5,
      revalidateOnFocus: false
    }
  )
  const { percent } = usePercent(60 * 5, mutate)

  return (
    <div className="flex flex-col gap-y-1">
      <ProgressBar percent={percent} />

      {isValidating && (
        <Loading />
      )}

      {bestPerformance?.length === 0 && (
        <div>No top play found.</div>
      )}

      {bestPerformance?.length > 0 && bestPerformance.map(performance => (
        <Score key={`bestPerformance:${performance.id}`} score={performance} />
      ))}
    </div>
  )
}