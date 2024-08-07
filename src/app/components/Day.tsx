import React from "react";
import { DayProps } from "../types/dayProps";
import ActivityList from "../components/ActivityList";
import { formatDate } from "../utils/formateDate";

const Day: React.FC<DayProps> = ({ timeDifference, date, activities, oneMinuteOfHeight, viewType}) => {
    const { dayOfWeek, dayOfMonth } = formatDate(date);
    return (
        <div className="day">
            <div className="day-header">
                <span className="day-of-week">{dayOfWeek}</span> <span className="day-of-month">{dayOfMonth}</span>
            </div>
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
