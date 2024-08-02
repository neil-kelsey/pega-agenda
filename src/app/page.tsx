"use client";

import styles from "./page.module.css";
import { SetStateAction, useState, useEffect } from "react";
import exampleData from "./data/test-data.json";
import { EventData } from "./types/activities";
import { extractUniqueDates } from "./utils/extractUniqueDates";
import { calculateTimeRange } from "./utils/calculateTimeRange";
import FilterPanel from "./components/FilterPanel";
import ActivityList from "./components/ActivityList";
import Week from "./components/Week";
import { AppProvider, useAppContext } from "./context/AppContext";

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

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const { earliestTime, latestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
    setEarliestTime(earliestTime);
    setLatestTime(latestTime);
    setTimeDifference(timeDifference);
  }, [selectedDate, data.activities]);

  return (
    <main className={styles.main}>
      <FilterPanel uniqueDates={uniqueDates} selectedDate={selectedDate} onDateChange={handleDateChange} />
      <Week uniqueDates={uniqueDates} timeDifference={timeDifference} />
    </main>
  );
};
