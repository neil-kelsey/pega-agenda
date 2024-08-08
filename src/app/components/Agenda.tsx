"use client";

import React, { useState, useEffect } from "react";
import { extractUniqueDates } from "../utils/extractUniqueDates";
import { calculateTimeRange } from "../utils/calculateTimeRange";
import FilterPanel from "./FilterPanel";
import DayContainer from "./DayContainer";
import { AppProvider, useAppContext } from "../context/AppContext";
import { EventData } from "../types/activities";

// TODO move this to it's own file
interface AgendaProps {
  activityMinHeight?: string;
  data: EventData;
}

const Agenda: React.FC<AgendaProps> = ({ activityMinHeight = "0px", data }) => {
  return (
    <AppProvider data={data}>
      <AgendaContent activityMinHeight={activityMinHeight} />
    </AppProvider>
  );
};

const AgendaContent: React.FC<{ activityMinHeight: string }> = ({ activityMinHeight }) => {
  const { data, selectedDate, setSelectedDate } = useAppContext();

  // Check if data is available before extracting unique dates
  const uniqueDates: string[] = data ? extractUniqueDates(data.activities) : [];

  const [earliestTime, setEarliestTime] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [weekTimeDifference, setWeekTimeDifference] = useState<number>(0);
  const [weekEarliestTime, setWeekEarliestTime] = useState<string>('');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [viewType, setViewType] = useState<'calendar' | 'list'>('calendar');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleViewModeChange = (viewMode: 'day' | 'week') => {
    setViewMode(viewMode);
  };

  const handleViewTypeChange = (viewType: 'calendar' | 'list') => {
    setViewType(viewType);
  };

  useEffect(() => {
    if (data) {
      if (viewMode === 'day') {
        const { earliestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
        setEarliestTime(earliestTime);
        setTimeDifference(timeDifference);
      } else {
        const { weekTimeDifference = 0, weekEarliestTime = '' } = calculateTimeRange(data.activities, uniqueDates);
        setWeekTimeDifference(weekTimeDifference);
        setWeekEarliestTime(weekEarliestTime);
      }
    }
  }, [selectedDate, data, uniqueDates]);

  return (
    // style attribute overwrites activityMinHeight variable in stylesheet default value if it exists as prop value on <Agenda />
    <main className={`${viewType === 'list' ? "list" : "calendar"}`} style={{ '--activity-min-height': activityMinHeight } as React.CSSProperties}>
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
            <DayContainer uniqueDates={uniqueDates} timeDifference={weekTimeDifference} weekEarliestTime={weekEarliestTime} viewType={viewType} /> : 
            <DayContainer uniqueDates={[selectedDate]} timeDifference={timeDifference} weekEarliestTime={earliestTime} viewType={viewType} />
        }
    </main>
  );
};

export default Agenda;
