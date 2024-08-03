"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { extractUniqueDates } from "./utils/extractUniqueDates";
import { calculateTimeRange } from "./utils/calculateTimeRange";
import FilterPanel from "./components/FilterPanel";
import Week from "./components/Week";
import Day from "./components/Day";
import { AppProvider, useAppContext } from "./context/AppContext";
import TimeColumn from "./components/TimeColumn";

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
}

const HomeContent: React.FC = () => {
  // Set the data
  const { data, selectedDate, setSelectedDate } = useAppContext();

  // Extract unique dates from activities
  const uniqueDates: string[] = extractUniqueDates(data.activities);

  const [earliestTime, setEarliestTime] = useState<string>('');
  const [latestTime, setLatestTime] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);

  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');

  console.log("NeilTest - viewMode", viewMode)

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  // Handle view mode change
  const handleViewModeChange = (viewMode: 'day' | 'week') => {
    console.log("NeilTest - handleViewModeChange", viewMode)
    setViewMode(viewMode);
  };

  useEffect(() => {
    // TODO
    // This is useful to calculate the time range for the selected date for day view
    // But for week view it needs to be whole range
    const { earliestTime, latestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
    setEarliestTime(earliestTime);
    setLatestTime(latestTime);
    setTimeDifference(timeDifference);
  }, [selectedDate, data.activities]);

  return (
    <main className={styles.main}>
      <FilterPanel uniqueDates={uniqueDates} selectedDate={selectedDate} onDateChange={handleDateChange} onViewModeChange={handleViewModeChange} />
      {viewMode === "week" ? 
        <Week uniqueDates={uniqueDates} timeDifference={timeDifference} /> : 
        <div className="week">
          {/* TODO - Make this a DayContainer component */}
          {/* TODO - I don't like how this is wrapped in a 'week' div when it'll only ever be a day, need better naming */}
          <TimeColumn timeDifference={timeDifference}/>
          <Day timeDifference={timeDifference} date={selectedDate} />
        </div>
      }
    </main>
  );
};
