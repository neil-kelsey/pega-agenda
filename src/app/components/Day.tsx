import React from "react";
import { DayProps } from "../types/dayProps";
import ActivityList from "../components/ActivityList";
import { useAppContext } from "../context/AppContext";

const Day: React.FC<DayProps> = ({ timeDifference }) => {
    const { data, selectedDate } = useAppContext();
    return (
        <div className="day">
            <div className="activities">
                <ActivityList activities={data.activities} selectedDate={selectedDate} />
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
