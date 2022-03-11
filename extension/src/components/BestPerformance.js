import { useEffect, useState } from "react";
import { getBestPerformance } from '../libs/axios'
import Score from './Score'

export default function BestPerformance({ config }) {
  const [bestPerformance, setBestPerformance] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const performance = await getBestPerformance({...config})

    setBestPerformance(performance)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-y-1">
      {isLoading && (
        <div className="flex justify-center">
          <div className="loading" />
        </div>
      )}

      {bestPerformance.length === 0 && !isLoading && (
        <div>No top play found.</div>
      )}

      {bestPerformance.length > 0 && bestPerformance.map(performance => (
        <Score key={`bestPerformance:${performance.id}`} score={performance} />
      ))}
    </div>
  )
}