import React from "react";
import styles from "./Modal.module.css";
import { Activity } from "../types/activities";

// TODO move this to its own file
interface ModalProps {
  activity: Activity;
  startTimeFormatted: string;
  endTimeFormatted: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ activity, startTimeFormatted, endTimeFormatted, onClose }) => {
  return (
    <div className={styles["modal-wrapper"]}>
        <div className={styles.modal}>
            <div className={"activity category-" + activity.category + " " + styles.modalActivity}>
                <h2>{activity.title}</h2>
                <h3>{startTimeFormatted} - {endTimeFormatted}<span className="bold"></span> - {activity.activityLength} minutes</h3>
                <p>{activity.details}</p>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;
