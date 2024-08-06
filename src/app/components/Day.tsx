import React from "react";
import { DayProps } from "../types/dayProps";
import ActivityList from "../components/ActivityList";

const Day: React.FC<DayProps> = ({ timeDifference, date, activities, oneMinuteOfHeight, viewType}) => {
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
