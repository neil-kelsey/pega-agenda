import React from "react";
import { DayProps } from "../types/dayProps";
import ActivityList from "../components/ActivityList";

const Day: React.FC<DayProps> = ({ timeDifference, date, activities, oneMinuteOfHeight, viewType}) => {

    console.log("NeilTest - Day");
    console.log("NeilTest - Day - date", date);
    console.log("NeilTest - Day - activities", activities);

    const findAndSeparateOverlappingActivities = (activities) => {
        // Helper function to parse ISO string to Date
        const parseTime = (isoString) => new Date(isoString).getTime();
      
        // Helper function to check if two activities overlap
        const isOverlapping = (activity1, activity2) => {
          const start1 = parseTime(activity1.startTime);
          const end1 = parseTime(activity1.endTime);
          const start2 = parseTime(activity2.startTime);
          const end2 = parseTime(activity2.endTime);
      
          return (start1 < end2 && start2 < end1);
        };
      
        // Arrays to hold overlapping and non-overlapping activities
        const nonOverlappingActivities = [];
        const overlappingActivities = [];
      
        // Check each activity against all others for overlaps
        activities.forEach((activity, index) => {
          let hasOverlap = false;
      
          for (let i = 0; i < activities.length; i++) {
            if (i !== index && isOverlapping(activity, activities[i])) {
              hasOverlap = true;
              break;
            }
          }
      
          if (hasOverlap) {
            overlappingActivities.push(activity);
          } else {
            nonOverlappingActivities.push(activity);
          }
        });
      
        return { nonOverlappingActivities, overlappingActivities };
      };






    const { nonOverlappingActivities, overlappingActivities } = findAndSeparateOverlappingActivities(activities);

    console.log("NeilTest - overlap - Non-overlapping activities:", nonOverlappingActivities);
    console.log("NeilTest - overlap - Overlapping activities:", overlappingActivities);

    

    return (
        <div className="day">
            <div className="time-lines">
                {[...Array(timeDifference)].map((_, index) => (
                    <span key={index}></span>
                ))}
            </div>
            <div className="activities">
                <ActivityList timeDifference={timeDifference} selectedDate={date} activities={activities} oneMinuteOfHeight={oneMinuteOfHeight} viewType={viewType} />
            </div>
        </div>
    );
};

export default Day;
