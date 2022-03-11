import useSWR from 'swr'
import { fetcher } from '../libs/axios'
import Score from './Score'


export default function BestPerformance({ config }) {
  const qs = new URLSearchParams(config)
  const { data: bestPerformance, isValidating } = useSWR(`v1/top_plays?${qs}`, fetcher)

  if (isValidating) {
    return (
      <div className="flex justify-center">
        <div className="loading" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-1">
      {bestPerformance.length === 0 && (
        <div>No top play found.</div>
      )}

      {bestPerformance.length > 0 && bestPerformance.map(performance => (
        <Score key={`bestPerformance:${performance.id}`} score={performance} />
      ))}
    </div>
  )
}