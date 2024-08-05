import React from "react";
import { ActivityListProps } from "../types/activityListProps";
import { extractFormattedTime } from "../utils/extractFormattedTime";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate, timeDifference, activities, oneMinuteOfHeight }) => {
  return (
    <>
      {activities.map((activity, index) => {
        const startTimeFormatted = extractFormattedTime(activity.startTime);
        const endTimeFormatted = extractFormattedTime(activity.endTime);
        return (
          <div key={index} className={"activity category-" + activity.category} style={{ top: activity.minutesFromDayStart * oneMinuteOfHeight + "%" , height: `calc(${activity.activityLength * oneMinuteOfHeight}% - 20px)` }}>
            <div className="activity-container">
              <h2><span className="bold">{activity.title}</span> - 30 minutes</h2>
              <p>{activity.details}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ActivityList;
