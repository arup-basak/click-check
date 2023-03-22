import { useState, useEffect } from 'react';
import App from '../App';

interface TimeProps {
  time: number, // Time in Seconds
  timerEnds: () => void;
}

const Timer = (timeProps: TimeProps) => {
  const [seconds, setSeconds] = useState(timeProps.time % 60);
  const [minutes, setMinutes] = useState(Math.floor((timeProps.time / 60)));

  useEffect(() => {
    let time = timeProps.time

    if (time > 0) {
      time--;
    
      const interval = setInterval(() => {
        let sec = time % 60;
        let min = Math.floor(time / 60);
    
        setMinutes(min);
        setSeconds(sec);
    
        time--;
    
        if (time < 0) {
          clearInterval(interval);
          timeProps.timerEnds();
        }
      }, 1000);    
    }
  }, [timeProps])

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
