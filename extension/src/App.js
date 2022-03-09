import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import BestPerformance from "./BestPerformance";
import RecentScores from "./RecentScores";

function App() {
  return (
    <div className="app">
      <header>
        <Tabs>
          <TabList>
            <Tab>Best Performance</Tab>
            <Tab>Recent scores</Tab>
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
      </header>
      <main>

      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
