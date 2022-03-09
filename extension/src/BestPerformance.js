import { useEffect, useState } from "react";
import { getBestPerformance } from './libs/axios'

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
    <div>
      Test
    </div>
  )
}