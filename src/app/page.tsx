"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { extractUniqueDates } from "./utils/extractUniqueDates";
import { calculateTimeRange } from "./utils/calculateTimeRange";
import FilterPanel from "./components/FilterPanel";
import Week from "./components/Week";
import { AppProvider, useAppContext } from "./context/AppContext";

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
  const [viewType, setViewType] = useState<'calendar' | 'list'>('calendar');

  console.log("NeilTest - page - viewMode", viewMode)
  console.log("NeilTest - page - viewType", viewType)

  // Handle change for the filter panel - set the selected day
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  // Handle view mode change
  const handleViewModeChange = (viewMode: 'day' | 'week') => {
    console.log("NeilTest - handleViewModeChange", viewMode)
    setViewMode(viewMode);
  };

  // Handle view type change
  const handleViewTypeChange = (viewType: 'calendar' | 'details') => {
    setViewType(viewType);
  };

  useEffect(() => {
    if (viewMode === 'day') {
      const { earliestTime, latestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
      setEarliestTime(earliestTime);
      setLatestTime(latestTime);
      setTimeDifference(timeDifference);
    } else {
      const { weekTimeDifference = 0, weekEarliestTime = '' } = calculateTimeRange(data.activities, uniqueDates);
      setWeekTimeDifference(weekTimeDifference);
      setWeekEarliestTime(weekEarliestTime);
    }
  }, [selectedDate, data.activities, uniqueDates]);

  return (
    <main className={`${viewType === 'list' ? "list" : "calendar"}`}>
      <FilterPanel 
        viewMode={viewMode} 
        uniqueDates={uniqueDates} 
        selectedDate={selectedDate} 
        onDateChange={handleDateChange} 
        onViewModeChange={handleViewModeChange} 
        viewType={viewType} 
        onViewTypeChange={handleViewTypeChange} 
      />
      {viewMode === "week" ? 
        <Week uniqueDates={uniqueDates} timeDifference={weekTimeDifference} weekEarliestTime={weekEarliestTime} viewType={viewType} /> : 
        // TODO - Make this a DayContainer component
        // TODO - I don't like how this is wrapped in a 'week' div when it'll only ever be a day, need better naming
        <Week uniqueDates={[selectedDate]} timeDifference={timeDifference} weekEarliestTime={earliestTime} viewType={viewType} />
      }
    </main>
  );
};
