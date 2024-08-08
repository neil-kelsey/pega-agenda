import React from "react";
import { DayContainerProps } from "../types/dayContainerProps";
import Day from "./Day";
import TimeColumn from "./TimeColumn";
import { useAppContext } from "../context/AppContext";
import { calculateActivityPositions } from "../utils/calculateActivityPositions";

const DayContainer: React.FC<DayContainerProps> = ({ uniqueDates, timeDifference, weekEarliestTime, viewType }) => {
  const { data } = useAppContext();
  const activities = data.activities;
  const { updatedActivities, oneMinuteOfHeight } = calculateActivityPositions(activities, uniqueDates, timeDifference, weekEarliestTime);

  return (
    <div className="week">
      {viewType === "calendar" ? <TimeColumn earliestTime={weekEarliestTime} timeDifference={timeDifference} /> : <></>}
      {uniqueDates.map((date, index) => {
        const activitiesForDate = updatedActivities.filter(activity => activity.startTime.startsWith(date));
        return (
          <Day key={index} timeDifference={timeDifference} date={date} activities={activitiesForDate} oneMinuteOfHeight={oneMinuteOfHeight} viewType={viewType} />
        );
      })}
    </div>
  );
};

export default DayContainer;
