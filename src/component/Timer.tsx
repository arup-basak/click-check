import { useState, useEffect, useRef } from 'react'

const Timer = (
  props: {
    time: number,
    onEnd: () => void
  }
) => {
  const getTimeString = (num: number): string => {
    return `${num < 10 ? '0' : ''}${num}`
  }

  // const EndTime = () => {
  //   props.onEnd()
  // }

  let value = useRef<number>(props.time)

  const [minute, setMinute] = useState<string>(getTimeString(Math.floor(value.current / 60)))
  const [second, setSecond] = useState<string>(getTimeString(value.current % 60))

  useEffect(() => {
    const setTime = () => {
      setMinute(getTimeString(Math.floor(value.current / 60)))
      setSecond(getTimeString(value.current % 60))
    }
    const interval = setInterval(() => {
      if (value.current < 0) {
        clearInterval(interval)
        // EndTime();
        props.onEnd()
        return;
      }
      setTime()
      value.current--;
    }, 1000)
  }, [value])

  return (
    <div className='flex'>
      <div>{minute}</div>
      :
      <div>{second}</div>

    </div>
  )
}

export default Timer