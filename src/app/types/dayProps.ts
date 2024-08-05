import { Activity } from "./activities";

export interface DayProps {
    timeDifference: number;
    date: string;
    activities: Activity[];
    oneMinuteOfHeight: number;
  }