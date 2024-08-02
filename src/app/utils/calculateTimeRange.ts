import { Activity } from "../types/activities";

interface TimeRangeResult {
  earliestTime: string;
  latestTime: string;
  timeDifference: number;
}

export const calculateTimeRange = (activities: Activity[], selectedDate: string): TimeRangeResult => {
  // Find earliest and latest times for the selected date
  const activitiesForSelectedDate = activities.filter(activity =>
    activity.startTime.startsWith(selectedDate)
  );

  if (activitiesForSelectedDate.length > 0) {
    // We need to figure out the earliest time and latest time in the data
    // So we know the time range we want to display
    const times = activitiesForSelectedDate.map(activity => activity.startTime.split('T')[1]);
    const sortedTimes = times.sort();
    const earliest = sortedTimes[0];
    const latest = sortedTimes[sortedTimes.length - 1];

    // Formatting the times to be only hours and minutes
    const formattedEarliest = earliest.substring(0, 5);
    const formattedLatest = latest.substring(0, 5);

    // Next we need to calculate the time range
    // Calculate the time difference in hours
    const earliestDate = new Date(`1970-01-01T${earliest}`);
    const latestDate = new Date(`1970-01-01T${latest}`);
    const differenceInHours = (latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60);

    // We need to round up the hour
    // If the last event ends at, in the worst case 18:59 we want the last time displayed to be 19:00
    const differenceInHoursRoundedUp = Math.ceil(differenceInHours);

    return {
      earliestTime: formattedEarliest,
      latestTime: formattedLatest,
      timeDifference: differenceInHoursRoundedUp,
    };
  } else {
    return {
      earliestTime: '',
      latestTime: '',
      timeDifference: 0,
    };
  }
};
