import React, { useState, useEffect } from 'react';

interface TimeProps {
  time: number; // Time in Seconds
}

const Timer = (timeProps: TimeProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timeProps.time > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => (seconds === 59 ? 0 : seconds + 1));
        setMinutes((minutes) => (seconds === 59 ? minutes + 1 : minutes));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeProps.time]);

  return (
    <div
      className='font-Mono m-2'>
      <span
        className='p-1 bg-slate-200 m-1 rounded-sm'>
        {minutes}
      </span>
      <span>:</span>
      <span
        className='p-1 bg-slate-200 m-1 rounded-sm'>
        {seconds}
      </span>
    </div>
  );
};

export default Timer;
