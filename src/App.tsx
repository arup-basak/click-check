import { useState } from 'react';
import Timer from './component/Timer';

function App() {
  const [text, setText] = useState('Total text is 0')
  const [a, setA] = useState(0)

  const handleClick = () => {
    setA(a + 1)
    setText(`Total text is ${a + 1}`)
  }

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return (
    <>
      <div className='w-3/5 m-auto flex flex-col bg-blue-50 justify-center select-none'>
        <div className='flex flex-row justify-between text-2xl font-Mono'>
          <p className='m-1 p-1'>{text}</p>
          <div>
            <Timer 
              time={20} 
              key={"mytimer"}
              onEnd={() => alert("Clock Ends")}
              />
          </div>
        </div>
        <div
          className='h-[400px] border border-slate-400 bg-slate-200 cursor-pointer w-3/5 m-auto rounded-xl'
          onClick={handleClick}
          onContextMenu={handleRightClick}
          id='click-area'></div>
      </div>
    </>
  );
}

export default App;
