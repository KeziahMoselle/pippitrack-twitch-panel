import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useEffect, useState } from "react";
import BestPerformance from "./components/BestPerformance";
import RecentScores from "./components/RecentScores";

function App() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    console.log('Getting config...')
    window.Twitch.ext.configuration.onChanged(() => {
      console.log('onChanged')
      if (window.Twitch.ext.configuration.broadcaster) {
        try {
          const config = JSON.parse(window.Twitch.ext.configuration.broadcaster.content)

          console.log('config', config)

          if (typeof config === 'object') {
            setConfig(config)
          } else {
            console.log('Invalid config')
          }
        } catch (e) {
          console.log('Invalid config', e)
        }
      }
    })
  }, [])

  if (!config) {
    return (
      <div className="flex justify-center">
        <div className="loading" />
      </div>
    )
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
