import { Activity } from "./activities";

export interface ActivityListProps {
    selectedDate: string;
    timeDifference: number;
    activities: Activity[];
    oneMinuteOfHeight: number;
    viewType: string;
    minutesFromDayStart?: number;
    activityLength?: number;
  }