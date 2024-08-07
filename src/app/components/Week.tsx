import React from "react";
import { WeekProps } from "../types/weekProps";
import Day from "./Day";
import TimeColumn from "./TimeColumn";
import { useAppContext } from "../context/AppContext";
import { calculateActivityPositions } from "../utils/calculateActivityPositions";

const Week: React.FC<WeekProps> = ({ uniqueDates, timeDifference, weekEarliestTime, viewType }) => {
  const { data } = useAppContext();
  const activities = data.activities;
  const { updatedActivities, oneMinuteOfHeight } = calculateActivityPositions(activities, uniqueDates, timeDifference, weekEarliestTime);
  
  // TODO move this logic to its own file
  const addAlignmentToActivities = (activities) => {
    // Helper function to parse ISO string to Date
    const parseTime = (isoString) => new Date(isoString).getTime();
  
    // Sort activities by startTime
    activities.sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
  
    // Assign alignment
    activities.forEach((activity, index) => {
      activity.alignment = "left"; // Default alignment
  
      // Check for overlaps with subsequent activities
      for (let i = index + 1; i < activities.length; i++) {
        const nextActivity = activities[i];
        const currentStartTime = parseTime(activity.startTime);
        const currentEndTime = parseTime(activity.endTime);
        const nextStartTime = parseTime(nextActivity.startTime);
        const nextEndTime = parseTime(nextActivity.endTime);
  
        if ((nextEndTime <= currentEndTime) || (nextStartTime <= currentStartTime)) {
          activity.alignment = "right";
          nextActivity.alignment = "left";
        }
      }
    });
  
    // Check for the number of "right" alignments
    const rightCount = activities.filter(activity => activity.alignment === "right").length;
  
    // If no "right" alignments, set all to "full"
    if (rightCount === 0) {
      activities.forEach(activity => activity.alignment = "full");
    }
  
    return activities;
  };

  const alignedActivities = addAlignmentToActivities(updatedActivities);
  console.log("NeilTest - week - alignedActivities", alignedActivities);

  // TODO - change weekEarliestTime and all those dates to be a number? At least keep it consistent
  return (
    <div className="week">
      {viewType === "calendar" ? <TimeColumn earliestTime={weekEarliestTime} timeDifference={timeDifference} /> : <></>}
      {uniqueDates.map((date, index) => {
        const activitiesForDate = alignedActivities.filter(activity => activity.startTime.startsWith(date));
        return (
          <Day timeDifference={timeDifference} date={date} activities={activitiesForDate} oneMinuteOfHeight={oneMinuteOfHeight} viewType={viewType} />
        );
      })}
    </div>
  );
};

export default Week;
