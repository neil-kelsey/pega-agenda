"use client";

import styles from "./page.module.css";
import { SetStateAction, useState, useEffect } from "react";
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

  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);
  const [earliestTime, setEarliestTime] = useState<string>('');
  const [latestTime, setLatestTime] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: SetStateAction<string>) => {
    console.log("NeilTest event", date)
    setSelectedDate(date);
  };

  // Find earliest and latest times for the selected date
  useEffect(() => {
    const activitiesForSelectedDate = data.activities.filter(activity =>
      activity.startTime.startsWith(selectedDate)
    );
    console.log("NeilTest - activitiesForSelectedDate", activitiesForSelectedDate);

    if (activitiesForSelectedDate.length > 0) {
      // We need to figure out the earliest time and latest time in the data
      // So we know the time range we want to display
      const times = activitiesForSelectedDate.map(activity => activity.startTime.split('T')[1]);
      const sortedTimes = times.sort();
      const earliest = sortedTimes[0];
      const latest = sortedTimes[sortedTimes.length - 1];

      console.log("NeilTest - activitiesForSelectedDate - earliest", earliest);
      console.log("NeilTest - activitiesForSelectedDate - latest", latest);
      
      // Formatting the times to be only hours and minutes
      const formattedEarliest = earliest.substring(0, 5);
      const formattedLatest = latest.substring(0, 5);

      console.log("NeilTest - activitiesForSelectedDate - formattedEarliest", formattedEarliest);
      console.log("NeilTest - activitiesForSelectedDate - formattedLatest", formattedLatest);

      setEarliestTime(formattedEarliest);
      setLatestTime(formattedLatest);

      // Next we need to calculate the time range
      // Calculate the time difference in hours
      const earliestDate = new Date(`1970-01-01T${earliest}`);
      const latestDate = new Date(`1970-01-01T${latest}`);
      const differenceInHours = (latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60);

      // We need to round up the hour
      // If the last event ends at, in the worst case 18:59 we want the last time displayed to be 19:00
      const differenceInHoursRoundedUp = Math.ceil(differenceInHours)
      console.log("NeilTest - differenceInHoursRoundedUp", differenceInHoursRoundedUp);

      setTimeDifference(differenceInHoursRoundedUp);
      } else {
        setEarliestTime('');
        setLatestTime('');
        setTimeDifference(0);
      }
    }, [selectedDate, data.activities]);

  return (
    <main className={styles.main}>
      <FilterPanel uniqueDates={uniqueDates} selectedDate={selectedDate} onDateChange={handleDateChange} />
      <ActivityList activities={data.activities} selectedDate={selectedDate} />

      <div className="week">
        <div className="time-column">
            {[...Array(timeDifference)].map((_, index) => (
              <span key={index}>7:00am</span>
            ))}
        </div>
        {Array.from({ length: uniqueDates.length }).map((_, index) => (
          <div key={index} className="day">
            <div className="time-lines">
              {[...Array(timeDifference)].map((_, index) => (
                <span key={index}></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
