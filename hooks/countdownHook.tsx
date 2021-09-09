import { useEffect, useState } from "react";

interface TimeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdownTimer(date: Date): [TimeLeftProps] {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  return [timeLeft];
}

const calculateTimeLeft = (date: Date) => {
  var countDownDate = date.getTime();
  var now = new Date().getTime();
  var difference = countDownDate - now;
  let timeLeft: TimeLeftProps = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};
