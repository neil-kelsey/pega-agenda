import { Activity } from "./activities";

export interface ActivityListProps {
    activities: Activity[];
    oneMinuteOfHeight: number;
    viewType: string;
    minutesFromDayStart?: number;
    activityLength?: number;
  }