export const incrementTime = (time: string, hours: number): string => {
    const [hour, minute] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour + hours);
    date.setMinutes(minute);
    return date.toTimeString().substring(0, 5);
  };