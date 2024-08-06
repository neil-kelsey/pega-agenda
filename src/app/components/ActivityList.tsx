import React, { useEffect } from "react";
import { ActivityListProps } from "../types/activityListProps";
import { extractFormattedTime } from "../utils/extractFormattedTime";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate, timeDifference, activities, oneMinuteOfHeight, viewType }) => {

  // TODO - Move this logic to its own file
  // and wrap it up into 'full width logic' as a props option on the component so if we don't like it we can turn it off
  // as it's hard coded to category-2 - then this could be developed in to selecting a dynamic category where the user can
  // pick which category they want to be full width - do that if I have time
  useEffect(() => {
    const category2Elements = document.querySelectorAll('.activity-wrapper.category-2');

    category2Elements.forEach((el, index) => {
      // Remove any existing half-width classes to ensure clean state
      el.classList.remove('half-width');
    });

    for (let i = 0; i < category2Elements.length - 1; i++) {
      if (category2Elements[i].nextElementSibling === category2Elements[i + 1]) {
        category2Elements[i].classList.add('half-width');
        category2Elements[i + 1].classList.add('half-width2');
        i++; // Skip the next element as it's already been processed
      }
    }
  }, [activities]); // Adding activities as dependency to run this effect whenever activities change

  return (
    <>
      {activities.map((activity, index) => {
        const startTimeFormatted = extractFormattedTime(activity.startTime);
        const endTimeFormatted = extractFormattedTime(activity.endTime);
        return (
          <div key={index} className={viewType === "list" ? "activity-wrapper list " + activity.alignment : "activity-wrapper category-" + activity.category}>
            <div className={"activity category-" + activity.category + " index-" + index + " " + activity.alignment + " startTime=" + activity.startTime + ", endTime=" + activity.endTime} style={{ top: activity.minutesFromDayStart * oneMinuteOfHeight + "%" , height: `calc(${activity.activityLength * oneMinuteOfHeight}% - 5px)` }}>
              <div className="activity-container">
                {viewType === "list" ?
                  <>
                    <h2>{activity.title}</h2>
                    <h3>{startTimeFormatted} - {endTimeFormatted}<span className="bold"></span> - {activity.activityLength} minutes</h3>
                    <p>{activity.details}</p>
                  </> : 
                  <>
                    <h2><span className="bold">{activity.title}</span> - {activity.activityLength} minutes</h2>
                    <p>{activity.details}</p>
                  </>
                }
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ActivityList;
