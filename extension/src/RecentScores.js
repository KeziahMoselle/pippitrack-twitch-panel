import { useEffect, useState } from "react";
import { getRecentScores } from './libs/axios'
import Score from './Score'

export default function RecentScores() {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const performance = await getRecentScores({
      id: '4431069',
      mode: 'osu',
    })

    setScores(performance)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-y-1">
      {isLoading && (
        <div class="flex justify-center">
          <div className="loading" />
        </div>
      )}

      {scores.length === 0 && !isLoading && (
        <div>No recent scores found.</div>
      )}

      {scores.length > 0 && scores.map(score => (
        <Score key={`recentScores:${score.id}`} score={score} />
      ))}
    </div>
  )
}