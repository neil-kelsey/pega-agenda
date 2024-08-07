import { Activity } from "../types/activities";

interface TimeRangeResult {
  earliestTime: string;
  latestTime: string;
  timeDifference: number;
  weekTimeDifference?: number;
  weekEarliestTime?: string;
}

export const calculateTimeRange = (activities: Activity[], selectedDateOrDates: string | string[]): TimeRangeResult => {
  const dates = Array.isArray(selectedDateOrDates) ? selectedDateOrDates : [selectedDateOrDates];
  const activitiesForSelectedDates = activities.filter(activity =>
    dates.some(date => activity.startTime.startsWith(date))
  );

  console.log("NeilTest - timeTest - activities", activities);

  console.log("NeilTest - timeTest - selectedDateOrDates", selectedDateOrDates);

  if (activitiesForSelectedDates.length > 0) {
    // We need to figure out the earliest time and latest time in the data
    // So we know the time range we want to display
    const times = activitiesForSelectedDates.map(activity => activity.startTime.split('T')[1]);
    const sortedTimes = times.sort();
    const earliest = sortedTimes[0];
    const latest = sortedTimes[sortedTimes.length - 1];

    // Formatting the times to be only hours and minutes
    const formattedEarliest = earliest.substring(0, 5);
    const formattedLatest = latest.substring(0, 5);

    console.log("NeilTest - timeTest - formattedEarliest", formattedEarliest);
    console.log("NeilTest - timeTest - formattedLatest", formattedLatest);

    //TODO - I don't like that we go from a string, then to a date value which is 1970 just to calculate difference

    // Next we need to calculate the time range
    // Calculate the time difference in hours
    const earliestDate = new Date(`1970-01-01T${earliest}`);
    const latestDate = new Date(`1970-01-01T${latest}`);
    const differenceInHours = (latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60);

    // We need to round up the hour
    // If the last event ends at, in the worst case 18:59 we want the last time displayed to be 19:00
    const differenceInHoursRoundedUp = Math.ceil(differenceInHours);

    // add one for the starting value
    // I ended up just adding another one for a total of 3 so there's some space at the top and bottom
    const differenceInHoursRoundedUpPlusOne = differenceInHoursRoundedUp + 3;

    return {
      earliestTime: formattedEarliest,
      latestTime: formattedLatest,
      timeDifference: differenceInHoursRoundedUpPlusOne,
      weekTimeDifference: differenceInHoursRoundedUpPlusOne,
      weekEarliestTime: formattedEarliest,
    };
  } else {
    return {
      earliestTime: '',
      latestTime: '',
      timeDifference: 0,
      weekTimeDifference: 0,
      weekEarliestTime: '',
    };
  }
};
