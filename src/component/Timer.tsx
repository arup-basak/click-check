import { useState, useEffect, useRef } from 'react';

const Timer = (props: {
  time: number;
  onEnd: () => void;
  working: boolean
}) => {
  const getTimeString = (num: number): string => {
    return `${num < 10 ? '0' : ''}${num}`;
  };

  let value = useRef<number>(props.time);

  const [minute, setMinute] = useState<string>(getTimeString(Math.floor(value.current / 60)));
  const [second, setSecond] = useState<string>(getTimeString(value.current % 60));

  useEffect(() => {
    const EndTime = () => {
      props.onEnd();
    };

    const setTime = () => {
      setMinute(getTimeString(Math.floor(value.current / 60)));
      setSecond(getTimeString(value.current % 60));
    };

    const interval = setInterval(() => {
      if (value.current < 0 || !props.working) {
        clearInterval(interval);
        EndTime();
        return;
      }
      setTime();
      value.current--;
    }, 1000);

    return () => {
      clearInterval(interval);
      value.current = props.time;
    };
  }, [props.time, props.working]);

  return (
    <div className='flex font-Mono'>
      <div>{minute}</div>
      :
      <div>{second}</div>
    </div>
  );
};

export default Timer;
