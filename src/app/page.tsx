"use client";

import styles from "./page.module.css";
import { ChangeEvent, useState } from "react";
import exampleData from "./data/test-data.json";

// Define an interface for the activity data type
interface Activity {
  startTime: string;
  endTime: string;
  title: string;
  details: string;
  category: number;
}

interface EventData {
  event: string;
  activities: Activity[];
}

export default function Home() {
  const data: EventData = exampleData;

  // Extract unique dates from activities
  const uniqueDates: string[] = Array.from(
    new Set(data.activities.map(activity => activity.startTime.split("T")[0]))
  );

  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const filteredActivities: Activity[] = data.activities.filter(activity =>
    activity.startTime.startsWith(selectedDate)
  );

  return (
    <main className={styles.main}>
      <select onChange={handleDateChange} value={selectedDate}>
        {uniqueDates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>

      {filteredActivities.map((activity, index) => (
        <p key={index}>Hello world</p>
      ))}
    </main>
  );
}
