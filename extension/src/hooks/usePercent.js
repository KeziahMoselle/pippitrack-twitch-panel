import { useEffect, useState } from "react";

function usePercent(maxSeconds = 30, callback) {
  const [percent, setPercent] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds >= maxSeconds) {
        setSeconds(0)
        setPercent(0)
        return callback()
      }

      setSeconds(seconds + 1)
      setPercent(seconds / maxSeconds * 100)
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds])

  return {
    percent,
    seconds,
  }
}

export default usePercent