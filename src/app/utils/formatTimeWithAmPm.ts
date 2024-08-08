export const formatTimeWithAmPm = (timeString: string) => {
  const [hour, minute] = timeString.split(':').map(Number);
  const suffix = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 || 12; // convert hour "0" to "12"
  return `${hour12}:${minute.toString().padStart(2, '0')}${suffix}`;
};