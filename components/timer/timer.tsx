import React from "react";
import styles from "./timer.module.scss";
import { useCountdownTimer } from "../../hooks/countdownHook";

interface TimerProps {
  title: string;
  date: Date;
  center?: boolean;
}

const timer = ({ title, date, center }: TimerProps) => {
  const [timeLeft] = useCountdownTimer(date);
  return (
    <div className={styles.timer} style={{margin: center ? '0 auto' : ''}}>
      <h1>{title}</h1>
      <ul>
        <li>
          <h4>{`${timeLeft.days.toString().padStart(2, "0")}`}</h4>
          <p>days</p>
        </li>
        <span>:</span>
        <li>
          <h4>{`${timeLeft.hours.toString().padStart(2, "0")}`}</h4>
          <p>hours</p>
        </li>
        <span>:</span>
        <li>
          <h4>{`${timeLeft.minutes.toString().padStart(2, "0")}`}</h4>
          <p>minutes</p>
        </li>
        <span>:</span>
        <li>
          <h4>{`${timeLeft.seconds.toString().padStart(2, "0")}`}</h4>
          <p>seconds</p>
        </li>
      </ul>
    </div>
  );
};

export default timer;
