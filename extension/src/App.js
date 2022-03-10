import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import BestPerformance from "./components/BestPerformance";
import RecentScores from "./components/RecentScores";

function App() {
  return (
    <div className="app">
      <Tabs>
        <TabList className="text-xs">
          <Tab className="uppercase">Best Performance</Tab>
          <Tab className="uppercase">Recent scores</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <BestPerformance />
          </TabPanel>
          <TabPanel>
            <RecentScores />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
