import { Activity } from "../types/activities";

export const extractUniqueDates = (activities: Activity[]): string[] => {
  return Array.from(new Set(activities.map(activity => activity.startTime.split("T")[0])));
};