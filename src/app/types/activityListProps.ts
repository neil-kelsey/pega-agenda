import { Activity } from "./activities";

export interface ActivityListProps {
    selectedDate: string;
    timeDifference: number;
    minutesFromDayStart: number;
    activities: Activity[];
    oneMinuteOfHeight: number;
    activityLength: number;
    viewType: string;
  }