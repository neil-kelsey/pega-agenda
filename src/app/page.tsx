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

// TODO Do I make this all a contained component? The the page component itself is really simple

const HomeContent: React.FC = () => {
  // Set the data
  const { data, selectedDate, setSelectedDate } = useAppContext();

  // Extract unique dates from activities
  const uniqueDates: string[] = extractUniqueDates(data.activities);

  const [earliestTime, setEarliestTime] = useState<string>('');
  const [latestTime, setLatestTime] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [weekTimeDifference, setWeekTimeDifference] = useState<number>(0);
  const [weekEarliestTime, setWeekEarliestTime] = useState<string>('');
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
    if (viewMode === 'day') {
      // For a single day view we want to show the time range from the earliest event for that day to the latest
      // So we use calculateTimeRange to set these consts
      const { earliestTime, latestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
      console.log("NeilTest - timecheck - timeDifference", timeDifference);
      console.log("NeilTest - earliestTime", earliestTime);
      setEarliestTime(earliestTime);
      setLatestTime(latestTime);
      setTimeDifference(timeDifference);
    } else {
      // But for week view we want to find the earliest and latest events for the entire week
      // TODO - we also need to find the earliest time for the week weekEarliestTime
      const { weekTimeDifference = 0, weekEarliestTime = '' } = calculateTimeRange(data.activities, uniqueDates);
      console.log("NeilTest - timecheck - weekTimeDifference", weekTimeDifference);
      console.log("NeilTest - timecheck - weekEarliestTime", weekEarliestTime);
      console.log("NeilTest - timecheck - weekEarliestTime", typeof weekEarliestTime);
      setWeekTimeDifference(weekTimeDifference);
      setWeekEarliestTime(weekEarliestTime);
    }
  }, [selectedDate, data.activities, uniqueDates]);

  return (
    <main className={styles.main}>
      <FilterPanel viewMode={viewMode} uniqueDates={uniqueDates} selectedDate={selectedDate} onDateChange={handleDateChange} onViewModeChange={handleViewModeChange} />
      {viewMode === "week" ? 
        <Week uniqueDates={uniqueDates} timeDifference={weekTimeDifference} weekEarliestTime={weekEarliestTime} /> : 
        <div className="week">
          {/* TODO - Make this a DayContainer component */}
          {/* TODO - I don't like how this is wrapped in a 'week' div when it'll only ever be a day, need better naming */}
          <TimeColumn earliestTime={earliestTime} timeDifference={timeDifference}/>
          <Day timeDifference={timeDifference} date={selectedDate} />
        </div>
      }
    </main>
  );
};
