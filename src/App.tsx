import React, { useState, useRef } from 'react';
import Timer from './component/Timer';
import { motion } from "framer-motion"
import Alert from './component/Alert';

const App = () => {
  const clickedCount = useRef(0);

  // Keys To Regenerate Components
  const [timerKey, setTimerKey] = useState(0);
  const [alertKey, setAlertKey] = useState(0);

  const [timerWorking, setTimerWorking] = useState(false)

  const [screenActive, setScreenActive] = useState(false)

  const [text, setText] = useState(`Clicked: ${clickedCount.current}`)
  const [clickAvailable, setClickAvailable] = useState(false)

  const [timerInitialTime, setTimerInitialTime] = useState(60);

  const setAlert = (message: string) => {
    console.log(message)
    setScreenActive(false)
    setAlertKey(alertKey + 1)
  }

  const onHandleAlertClose = (time: number) => {
    setTimerInitialTime(time)
    setScreenActive(true)
    handleReset()
  }

  const regenerateTimer = () => {
    setTimerKey((prevKey) => prevKey + 1);
  };

  const startWorkingTimer = () => {
    setTimerWorking(true)
    setTimerKey((prevKey) => prevKey + 1);
  }

  const handleReset = () => {
    setClickAvailable(true)
    clickedCount.current = 0;
    setText(`Clicked: ${clickedCount.current}`)
    setTimerWorking(false)
    regenerateTimer()
  }

  const handleClick = () => {
    if (screenActive) {
      if (!timerWorking)
        startWorkingTimer()
      if (clickAvailable)
        setText(`Clicked: ${++clickedCount.current}`)
    }
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (screenActive)
      setMousePosition({
        x: event.clientX - 8,
        y: event.clientY - 8
      })
  }

  const onTimerEnd = () => {
    if (timerWorking) {
      setClickAvailable(false)
      setAlert("Done")
    }
  }

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <>
      <Alert
        previousTime={timerInitialTime}
        key={alertKey}
        onClose={onHandleAlertClose}
      />
      <div className={`w-3/5 m-auto flex flex-col bg-blue-50 justify-center select-none p-2 pb-9 rounded-sm`}>
        <div className='flex flex-row justify-between text-2xl font-Mono'>
          <p className='m-1 p-1'>{text}</p>
          <div className='flex flex-row mt-2'>
            <div className='cursor-pointer px-2' onClick={handleReset}>
              <img
                src={`${process.env.PUBLIC_URL}/reset.svg`}
                alt="Reset Icon"
                className='h-8'
              />
            </div>
            <Timer
              time={timerInitialTime}
              key={timerKey}
              onEnd={onTimerEnd}
              working={timerWorking}
            />
          </div>
        </div>
        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay: 0.3
          }}
          className='clicked-area h-[400px] border border-slate-400 bg-slate-200 cursor-pointer w-3/5 m-auto rounded-xl flex justify-center items-center'
          onClick={handleClick}
          onContextMenu={handleRightClick}
          onMouseMove={handleMouseMove}>
          <div>{timerWorking ? "" : `Click the Block to Start the Game`}</div>
          <motion.div
            className="fixed rounded-full h-5 w-5 bg-red-500"
            id="mouse-pointer"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate="default"
            transition={{
              x: {
                duration: 0.3,
                ease: "linear",
                repeat: 0,
                type: "spring",
                stiffness: 80,
              },
              y: {
                duration: 0.3,
                ease: "linear",
                repeat: 0,
                type: "spring",
                stiffness: 80,
              },
              default: {
                duration: 2.5,
                repeat: Infinity,
              },
            }}
          />
        </motion.div>
      </div>
    </>
  );
}

export default App;
