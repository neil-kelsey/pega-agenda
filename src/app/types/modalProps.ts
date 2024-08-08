import { Activity } from "./activities";

export interface ModalProps {
  activity: Activity;
  startTimeFormatted: string;
  endTimeFormatted: string;
  onClose: () => void;
}