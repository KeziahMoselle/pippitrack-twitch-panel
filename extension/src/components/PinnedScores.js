import useSWR from 'swr'
import { fetcher } from '../libs/axios'
import Loading from './Loading'
import Score from './Score'
import UpdatedAt from './UpdatedAt'
import { useEffect, useState } from 'react'

export default function BestPerformance({ config }) {
  const [updatedAt, setUpdatedAt] = useState(new Date())
  const qs = new URLSearchParams(config)
  const { data: pinnedScores, isValidating } = useSWR(
    `v1/pinned_scores?${qs}`,
    fetcher, {
      revalidateOnFocus: false
    }
  )

  useEffect(() => {
    setUpdatedAt(new Date())
  }, [pinnedScores])

  return (
    <div className="flex flex-col gap-y-1">
      {isValidating && (
        <Loading />
      )}

      {pinnedScores?.length === 0 && (
        <div className="text-center">
          <p>No pinned scores yet.</p>
        </div>
      )}

      {pinnedScores?.length > 0 && pinnedScores.map(score => (
        <Score key={`pinnedScores:${score.id}`} score={score} />
      ))}

      <UpdatedAt date={updatedAt} />
    </div>
  )
}