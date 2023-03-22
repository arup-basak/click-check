import { useState } from 'react';
import Timer from './component/Timer';

function App() {
  const [text, setText] = useState('Total text is 0')
  const [a, setA] = useState(0)

  const clear = () => {
    setA(0)
    setText(`Total text is ${0}`)
  }

  const handleClick = () => {
    setA(a + 1)
    console.log(a)
    setText(`Total text is ${a + 1}`)
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleTimerEnds = () => {
    console.log("Hello World");
  }

  return (
    <>
      <div id="container" className='w-3/5 m-auto flex bg-blue-50 justify-center select-none'>
        <Timer time={12} timerEnds={handleTimerEnds}/>
        <div
          className='h-[400px] bg-red-400 w-[400px] cursor-pointer'
          onClick={handleClick}
          onContextMenu={handleRightClick}
          id='click-area'></div>
        <button 
          className='p-2 bg-red-300 h-fit'
          id="reset-button"
          onClick={clear}>Reset</button>
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
