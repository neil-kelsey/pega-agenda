// Define an interface for the activity data type
export interface Activity {
  startTime: string;
  endTime: string;
  title: string;
  details: string;
  category: number;
  minutesFromDayStart?: number;
  activityLength?: number;
  alignment?: string;
}

export interface EventData {
  event: string;
  activities: Activity[];
}
