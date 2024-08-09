import React, { useEffect, useState } from "react";
import { ActivityListProps } from "../types/activityListProps";
import { extractFormattedTime } from "../utils/extractFormattedTime";
import { formatTimeWithAmPm } from "../utils/formatTimeWithAmPm";
import { applyCategoryStyles } from "../utils/applyCategoryStyles";
import Modal from "./Modal";

const ActivityList: React.FC<ActivityListProps> = ({ activities, oneMinuteOfHeight, viewType }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    applyCategoryStyles();
  }, [activities]);

  const activityClickHandler = (index: number) => {
    setActiveModal(activeModal === index ? null : index);
  };

  return (
    <>
      {activities.map((activity, index) => {
        const startTimeFormatted = formatTimeWithAmPm(extractFormattedTime(activity.startTime));
        const endTimeFormatted = formatTimeWithAmPm(extractFormattedTime(activity.endTime));
        const minutesFromDayStart = activity.minutesFromDayStart ?? 0;
        const activityLength = activity.activityLength ?? 0;

        return (
          <React.Fragment key={index}>
            <div className={viewType === "list" ? "activity-wrapper category-" + activity.category + " index-" + index + " list " + activity.alignment : "activity-wrapper category-" + activity.category}>
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
                      <h2>
                        {startTimeFormatted} - {endTimeFormatted}
                        {(activity.activityLength ?? 0) > 0 && (
                          <>
                            <span className="bold"></span> - {activity.activityLength} minutes
                          </>
                        )}
                      </h2>
                      <p>{activity.details}</p>
                    </>
                  }
                </div>
              </div>
            </div>
            {activeModal === index && (
              <Modal activity={activity} startTimeFormatted={startTimeFormatted} endTimeFormatted={endTimeFormatted} onClose={() => setActiveModal(null)} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ActivityList;
