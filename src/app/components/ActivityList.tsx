import React from "react";
import { Activity } from "../types/activities";
import { ActivityListProps } from "../types/activityListProps";
import { useAppContext } from "../context/AppContext";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate, timeDifference }) => {
  const { data } = useAppContext();
  const activities = data.activities;
  const filteredActivities: Activity[] = activities.filter(activity =>
    activity.startTime.startsWith(selectedDate)
  );


  console.log("NeilTest - ActivityList - filteredActivities", filteredActivities);
  




  // We need to move the activities from the top of the div to their correct location

  // FOLLOWING EXAMPLES are for the first page only - 2024-08-04

  // timeDifference will return 8 - this is how many timestamps we return on the left hand column
  // We will need to -1 from this number, the first number is 0, second is 1 and so on
  
  // 100 / 7 will give one hour of height = 14.28%
  // 100 / 7 / 60 will give one minute of height = 0.238%
  const hours = timeDifference - 1;
  const oneMinuteOfHeight = 100 / hours / 60;
  console.log("NeilTest - ActivityList -  oneMinuteOfHeight", oneMinuteOfHeight);

  // For 12:00 I would want 0%
  // For 1:00 I would want 14.28%
  // and so on

  // Here are our activities
  // 12:00, 13:00, 13:30, 15:00, 15:30, 16:30, 17:15, 18:30

  // We know each activities start time - take the first example 12:00 - we want this to always return 0% of height
  // The next example 13:00 needs to return 60 minutes of height

  // So first we always minus 12:00 from all the values
  const firstActivityStartDate = filteredActivities[0].startTime
  console.log("NeilTest - ActivityList - firstActivityStartDate", firstActivityStartDate);

  // TODO Feels like I repeat this functionality - consider moving it to a utils function
  const extractTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Then calculate the values in minutes
  const calculateMinutesFromDayStart = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
  };
  
  const firstActivityStartTimeTest = extractTime(firstActivityStartDate);
  console.log("NeilTest - ActivityList - firstActivityStartTime", firstActivityStartTimeTest);
  
  const totalMinutes = calculateMinutesFromDayStart(firstActivityStartTimeTest);
  console.log("NeilTest - ActivityList - totalMinutes", totalMinutes); // 720

// Extract the start time of the first activity and convert to minutes from the start of the day
const firstActivityStartTime = extractTime(filteredActivities[0].startTime);
const dayStartMinutes = calculateMinutesFromDayStart(firstActivityStartTime);

// Add the new property to each activity
const updatedActivities = filteredActivities.map((activity, index) => {
  const activityStartTime = extractTime(activity.startTime);
  const minutesFromDayStart = calculateMinutesFromDayStart(activityStartTime) - dayStartMinutes;
  
  return {
    ...activity,
    minutesFromDayStart,
  };
});

console.log("NeilTest - ActivityList - updatedActivities", updatedActivities); // 720

  // Here are our activities new predicted values
  // 0, 60, 90, 120, 150, 210, 255, 330

  // then we can just do 

  // 0 x 0.238, 60 x 0.238 etc etc

  return (
    <>
      {updatedActivities.map((activity, index) => (
        <div style={{ top: activity.minutesFromDayStart * oneMinuteOfHeight  + "%" }} className={"activity category-" + activity.category} key={index}>
          <p>{activity.startTime} - {activity.endTime}</p>
          <p>{activity.title}</p>
          <p>{activity.details}</p>
          <p>{activity.minutesFromDayStart}</p>
        </div>
      ))}
    </>
  );
};

export default ActivityList;
