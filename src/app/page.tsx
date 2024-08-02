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

export default function Home() {
  // Set the data
  const data: EventData = exampleData;

  // Extract unique dates from activities
  const uniqueDates: string[] = extractUniqueDates(data.activities);

  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);
  const [earliestTime, setEarliestTime] = useState<string>('');
  const [latestTime, setLatestTime] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: SetStateAction<string>) => {
    console.log("NeilTest event", date)
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
      <ActivityList activities={data.activities} selectedDate={selectedDate} />

      <Week uniqueDates={uniqueDates} timeDifference={timeDifference} />
    </main>
  );
}
