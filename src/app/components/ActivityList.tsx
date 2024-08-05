import React from "react";
import { ActivityListProps } from "../types/activityListProps";
import { useAppContext } from "../context/AppContext";
import { calculateActivityPositions } from "../utils/calculateActivityPositions";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate, timeDifference, activities, oneMinuteOfHeight }) => {
  return (
    <>
      {activities.map((activity, index) => (
        // TODO consider passing values through to a CSS parameter to avoid the inline styling - https://stackoverflow.com/questions/17893823/how-to-pass-parameters-to-css-classes
        <div style={{ top: activity.minutesFromDayStart * oneMinuteOfHeight + "%" }} className={"activity category-" + activity.category} key={index}>
          <p>{activity.startTime} - {activity.endTime}</p>
          <p>{activity.title}</p>
          <p>{activity.details}</p>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
