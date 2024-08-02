"use client";

import styles from "./page.module.css";
import { SetStateAction, useState } from "react";
import exampleData from "./data/test-data.json";
import { EventData } from "./types/activities";
import { extractUniqueDates } from "./utils/extractUniqueDates";
import FilterPanel from "./components/FilterPanel";
import ActivityList from "./components/ActivityList";

export default function Home() {
  // Set the data
  const data: EventData = exampleData;

  // Extract unique dates from activities
  const uniqueDates: string[] = extractUniqueDates(data.activities);

  // Set selected date for the day component
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: SetStateAction<string>) => {
    console.log("NeilTest event", date)
    setSelectedDate(date);
  };

  return (
    <main className={styles.main}>
      <FilterPanel uniqueDates={uniqueDates} selectedDate={selectedDate} onDateChange={handleDateChange} />
      <ActivityList activities={data.activities} selectedDate={selectedDate} />
    </main>
  );
}
