import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useEffect, useState } from "react";
import BestPerformance from "./components/BestPerformance";
import RecentScores from "./components/RecentScores";
import PinnedScores from './components/PinnedScores'
import getConfig from "./libs/getConfig";
import { FiClock, FiAward, FiHeart } from 'react-icons/fi'

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState(null)

  useEffect(() => {
    loadConfig()
  }, [])

  async function loadConfig() {
    try {
      const config = await getConfig()
      setConfig(config)
    } catch (error) {
      console.error('PippiTrack error getting config', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleTabsChange(index) {
    setTabIndex(index);
  };

  if (!config || isLoading) {
    return (
      <div className="flex justify-center">
        <div className="loading" />
      </div>
    )
  }

  if (!config || !isLoading) {
    <div className="flex justify-center">
      <p>Sorry there was an error.</p>
    </div>
  }

  return (
    <div className="app">
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList className="text-xxs">
          <Tab className="tab">
            <FiHeart className="h-5 w-5" fill={`${tabIndex === 0 ? '#FFFFFF': ''}`} />
            Pinned
          </Tab>
          <Tab className="tab">
            <FiAward className="h-5 w-5" fill={`${tabIndex === 1 ? '#FFFFFF': ''}`} />
            Best
          </Tab>
          <Tab className="tab">
            <FiClock className="h-5 w-5" fill={`${tabIndex === 2 ? '#FFFFFF': ''}`} />
            Recent
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel className="py-8 px-4">
            <PinnedScores config={config}/>
          </TabPanel>
          <TabPanel>
            <BestPerformance config={config}/>
          </TabPanel>
          <TabPanel className="py-8 px-4">
            <RecentScores config={config}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
