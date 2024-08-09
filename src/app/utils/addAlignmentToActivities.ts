import { Activity } from "../types/activities";

export const addAlignmentToActivities = (activities: Activity[]) => {
    // Helper function to parse ISO string to Date
    const parseTime = (isoString: string | number | Date) => new Date(isoString).getTime();
  
    // Sort activities by startTime
    activities.sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
  
    // Assign alignment
    activities.forEach((activity, index) => {
      activity.alignment = "left"; // Default alignment
  
      // Check for overlaps with subsequent activities
      for (let i = index + 1; i < activities.length; i++) {
        const nextActivity = activities[i];
        const currentStartTime = parseTime(activity.startTime);
        const currentEndTime = parseTime(activity.endTime);
        const nextStartTime = parseTime(nextActivity.startTime);
        const nextEndTime = parseTime(nextActivity.endTime);
  
        if ((nextEndTime <= currentEndTime) || (nextStartTime <= currentStartTime)) {
          activity.alignment = "right";
          nextActivity.alignment = "left";
        }
      }
    });
  
    // Check for the number of "right" alignments
    const rightCount = activities.filter(activity => activity.alignment === "right").length;
  
    // If no "right" alignments, set all to "full"
    if (rightCount === 0) {
      activities.forEach(activity => activity.alignment = "full");
    }
  
    return activities;
  };
  