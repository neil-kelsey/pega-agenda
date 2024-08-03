import React from "react";
import { DayProps } from "../types/dayProps";
import ActivityList from "../components/ActivityList";

const Day: React.FC<DayProps> = ({ timeDifference, date}) => {
    return (
        <div className="day">
            <div className="activities">
                <ActivityList timeDifference={timeDifference} selectedDate={date} />
            </div>
            <div className="time-lines">
                {[...Array(timeDifference)].map((_, index) => (
                    <span key={index}></span>
                ))}
            </div>
        </div>
    );
};

export default Day;
