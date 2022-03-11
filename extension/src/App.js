import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useEffect, useState } from "react";
import BestPerformance from "./components/BestPerformance";
import RecentScores from "./components/RecentScores";
import getConfig from "./libs/getConfig";

function App() {
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
      <Tabs>
        <TabList className="text-xs">
          <Tab className="uppercase">Best Performance</Tab>
          <Tab className="uppercase">Recent scores</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <BestPerformance config={config}/>
          </TabPanel>
          <TabPanel>
            <RecentScores config={config}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
