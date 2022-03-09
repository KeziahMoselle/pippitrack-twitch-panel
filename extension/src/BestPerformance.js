import { useEffect, useState } from "react";
import { getBestPerformance } from './libs/axios'
import Score from './Score'

export default function BestPerformance() {
  const [bestPerformance, setBestPerformance] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const performance = await getBestPerformance({
      id: '5914915',
      mode: 'osu',
    })

    setBestPerformance(performance)
  }

  return (
    <div className="flex flex-col gap-y-1">
      {bestPerformance.length === 0 && (
        <div>Loading...</div>
      )}

      {bestPerformance.length > 0 && bestPerformance.map(performance => (
        <Score score={performance} />
      ))}
    </div>
  )
}