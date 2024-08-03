import React from "react";
import { Activity } from "../types/activities";
import { ActivityListProps } from "../types/activityListProps";
import { useAppContext } from "../context/AppContext";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate }) => {
  const { data } = useAppContext();
  const activities = data.activities;
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
