import React, { useEffect, useState } from "react";
import { ActivityListProps } from "../types/activityListProps";
import { extractFormattedTime } from "../utils/extractFormattedTime";
import { formatTimeWithAmPm } from "../utils/formatTimeWithAmPm";
import Modal from "./Modal";

const ActivityList: React.FC<ActivityListProps> = ({ selectedDate, timeDifference, activities, oneMinuteOfHeight, viewType }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  console.log("NeilTest - ActivityList - activeModal", activeModal)
  // TODO - Move this logic to its own file
  // Wrap it up into 'full width logic' as a props option on the component so if we don't like it we can turn it off
  // as it's hard coded to category-2 - then this could be developed into selecting a dynamic category where the user can
  // pick which category they want to be full width - do that if I have time

  useEffect(() => {
    console.log("NeilTest - ActivityList")
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

  const activityClickHandler = (index: number) => {
    setActiveModal(activeModal === index ? null : index);
    console.log("NeilTest - ActivityList - activityClickHandler", index);
  };

  return (
    <>
      {activities.map((activity, index) => {
        const startTimeFormatted = formatTimeWithAmPm(extractFormattedTime(activity.startTime));
        const endTimeFormatted = formatTimeWithAmPm(extractFormattedTime(activity.endTime));
        const minutesFromDayStart = activity.minutesFromDayStart ?? 0;
        const activityLength = activity.activityLength ?? 0;

        return (
          <>
            <div key={index} className={viewType === "list" ? "activity-wrapper category-" + activity.category + " index-" + index + " list " + activity.alignment : "activity-wrapper category-" + activity.category}>
            {/* We calculate the time the activity will render with this - activity.minutesFromDayStart * oneMinuteOfHeight + 60 * oneMinuteOfHeight + "%"
            The time from day start times by "one minute of height" which is a calculation of what one minute of height will represent on the users screen
            We then add one minute of height times by 60 which gives us an hour, this is so we have some spacing of one hour at the top which gives a cleaner feel */}
            <div 
              onClick={() => activityClickHandler(index)} 
              className={`activity category-${activity.category} index-${index} ${activity.alignment}`} 
              style={{ top: `${minutesFromDayStart * oneMinuteOfHeight + 60 * oneMinuteOfHeight}%`, height: `calc(${activityLength * oneMinuteOfHeight}% - 5px)` }}
              role="button" 
              tabIndex={0}
            >
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
          {activeModal === index && (
            <Modal activity={activity} startTimeFormatted={startTimeFormatted} endTimeFormatted={endTimeFormatted} onClose={() => setActiveModal(null)} />
          )}
          </>
        );
      })}
    </>
  );
};

export default ActivityList;
