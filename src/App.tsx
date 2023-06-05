import React, { useState, useRef } from 'react';
import Timer from './component/Timer';
import { motion } from "framer-motion"

const App = () => {
  const clickedCount = useRef(0);

  const [text, setText] = useState(`Clicked: ${clickedCount.current}`)
  const [clickAvailable, setClickAvailable] = useState(true)

  const handleClick = () => {
    if(clickAvailable)
      setText(`Clicked: ${++clickedCount.current}`)
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: event.clientX-8,
      y: event.clientY-8
    })
  }

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <>
      <div className='w-3/5 m-auto flex flex-col bg-blue-50 justify-center select-none p-2 pb-9 rounded-sm'>
        <div className='flex flex-row justify-between text-2xl font-Mono'>
          <p className='m-1 p-1'>{text}</p>
          <div>
            <Timer
              time={25}
              key={"mytimer"}
              onEnd={() => setClickAvailable(false)}
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
          className='clicked-area h-[400px] border border-slate-400 bg-slate-200 cursor-pointer w-3/5 m-auto rounded-xl'
          onClick={handleClick}
          onContextMenu={handleRightClick}
          onMouseMove={e => handleMouseMove(e)}>
          <motion.div
            className="fixed rounded-full h-5 w-5 bg-red-500"
            id="mouse-pointer"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate="default"
            // whileTap={{ scale: 5 }}
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
