import { Activity } from "../types/activities";

const extractTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const calculateMinutesFromDayStart = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours * 60) + minutes;
};

export const calculateActivityPositions = (activities: Activity[], selectedDates: string[], timeDifference: number, weekEarliestTime: string) => {
  const filteredActivities: Activity[] = activities.filter(activity =>
    selectedDates.some(date => activity.startTime.startsWith(date))
  );

  if (filteredActivities.length === 0) {
    return { updatedActivities: [], oneMinuteOfHeight: 0 };
  }

  // const firstActivityStartDate = filteredActivities[0].startTime; original
  // const firstActivityStartTime = extractTime(firstActivityStartDate); original
  const firstActivityStartTime = weekEarliestTime;

  console.log("NeilTest - calc - firstActivityStartTime", firstActivityStartTime)


  const dayStartMinutes = calculateMinutesFromDayStart(firstActivityStartTime);

  const updatedActivities = filteredActivities.map((activity, index) => {
    const activityStartTime = extractTime(activity.startTime);
    const minutesFromDayStart = calculateMinutesFromDayStart(activityStartTime) - dayStartMinutes;

    return {
      ...activity,
      minutesFromDayStart,
    };
  });

  const hours = timeDifference - 1;
  const oneMinuteOfHeight = 100 / hours / 60;

  return { updatedActivities, oneMinuteOfHeight };
};
