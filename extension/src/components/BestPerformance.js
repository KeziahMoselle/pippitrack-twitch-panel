import { Fragment } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import useSWR from 'swr'
import { refreshIntervalBestPerformance } from '../constants'
import usePercent from '../hooks/usePercent'
import { fetcher } from '../libs/axios'
import Loading from './Loading'
import ProgressBar from './ProgressBar'
import Score from './Score'
import { useState, useEffect } from 'react'
import UpdatedAt from './UpdatedAt';

export default function BestPerformance({ config }) {
  const [updatedAt, setUpdatedAt] = useState(new Date())
  const qs = new URLSearchParams(config)
  const { data: bestPerformance, isValidating, mutate } = useSWR(
    `v1/top_plays?${qs}`,
    fetcher, {
      refreshInterval: refreshIntervalBestPerformance,
      revalidateOnFocus: false
    }
  )
  const [recentTops, setRecentTops] = useState([])
  const { percent } = usePercent(60 * 20, mutate)

  useEffect(() => {
    setUpdatedAt(new Date())
  }, [bestPerformance])

  useEffect(() => {
    if (bestPerformance && bestPerformance.length > 0) {
      setRecentTops(
        [...bestPerformance].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      )
    }
  }, [bestPerformance])

  return (
    <Fragment>
      <Tabs>
        <TabList className="text-xxs">
          <Tab className="tab--secondary">
            by PP
          </Tab>
          <Tab className="tab--secondary">
            Recent
          </Tab>
        </TabList>

        <TabPanels className="p-0">
          <TabPanel className="py-8 px-4">
            <div className="flex flex-col gap-y-1">
              <ProgressBar percent={percent} />

              {isValidating && (
                <Loading />
              )}

              {bestPerformance?.length === 0 && (
                <div className="text-center">
                  <p>Play the game!</p>
                </div>
              )}

              {bestPerformance?.length > 0 && bestPerformance.map(performance => (
                <Score key={`bestPerformance:${performance.id}`} score={performance} />
              ))}
            </div>
          </TabPanel>
          <TabPanel className="py-8 px-4">
            <div className="flex flex-col gap-y-1">
              {recentTops?.length === 0 && (
                <div className="text-center">
                  <p>Play the game!</p>
                </div>
              )}

              {recentTops?.length > 0 && recentTops.map(score => (
                <Score key={`recentTops:${score.id}`} score={score} />
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <UpdatedAt date={updatedAt} />
    </Fragment>
  )
}