import React from "react";
import { Activity } from "../types/activities";
import { ActivityListProps } from "../types/activityListProps";

const ActivityList: React.FC<ActivityListProps> = ({ activities, selectedDate }) => {
  const filteredActivities: Activity[] = activities.filter(activity =>
    activity.startTime.startsWith(selectedDate)
  );

  return (
    <div>
      {filteredActivities.map((activity, index) => (
        <p key={index}>Hello world</p>
      ))}
    </div>
  );
};

export default ActivityList;
