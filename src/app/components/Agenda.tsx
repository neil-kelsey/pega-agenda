"use client";

import React, { useState, useEffect } from "react";
import { extractUniqueDates } from "../utils/extractUniqueDates";
import { calculateTimeRange } from "../utils/calculateTimeRange";
import FilterPanel from "./FilterPanel";
import DayContainer from "./DayContainer";
import { useAppContext } from "../context/AppContext";

// TODO move this to it's own file
interface AgendaProps {
    activityMinHeight: string;
  }

const Agenda: React.FC<AgendaProps> = ({ activityMinHeight }) => {
  const { data, selectedDate, setSelectedDate } = useAppContext();

  const uniqueDates: string[] = extractUniqueDates(data.activities);

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
    if (viewMode === 'day') {
      const { earliestTime, timeDifference } = calculateTimeRange(data.activities, selectedDate);
      setEarliestTime(earliestTime);
      setTimeDifference(timeDifference);
    } else {
      const { weekTimeDifference = 0, weekEarliestTime = '' } = calculateTimeRange(data.activities, uniqueDates);
      setWeekTimeDifference(weekTimeDifference);
      setWeekEarliestTime(weekEarliestTime);
    }
  }, [selectedDate, data.activities, uniqueDates]);

  return (
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
