import React from "react";
import { WeekProps } from "../types/weekProps";
import Day from "./Day";
import TimeColumn from "./TimeColumn";
import { useAppContext } from "../context/AppContext";
import { calculateActivityPositions } from "../utils/calculateActivityPositions";

const Week: React.FC<WeekProps> = ({ uniqueDates, timeDifference, weekEarliestTime }) => {
  const { data } = useAppContext();
  const activities = data.activities;
  const { updatedActivities, oneMinuteOfHeight } = calculateActivityPositions(activities, uniqueDates, timeDifference, weekEarliestTime);
  
  console.log("NeilTest - week - updatedActivities", updatedActivities);

  // TODO - change weekEarliestTime and all those dates to be a number? At least keep it consistent
  return (
    <div className="week">
      <TimeColumn earliestTime={weekEarliestTime} timeDifference={timeDifference} />
      {uniqueDates.map((date, index) => {
        // Filter data for the correct date
        const activitiesForDate = updatedActivities.filter(activity => activity.startTime.startsWith(date));
        return (
          <Day timeDifference={timeDifference} date={date} activities={activitiesForDate} oneMinuteOfHeight={oneMinuteOfHeight} />
        );
      })}
    </div>
  );
};

export default Week;
