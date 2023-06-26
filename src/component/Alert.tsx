import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChangeEvent } from 'react';

interface AlertProps {
    message?: string,
    previousTime: number
    onClose: (newTime: number) => void
}

const Alert = (props: AlertProps) => {
    const [display, setDisplay] = useState('block')
    const [time, setTime] = useState<string>(props.previousTime.toString());
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };
    
    return (
        <div className={`fixed w-full h-screen flex justify-center items-center ${display}`}>
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
                className='p-10 rounded-md bg-blue-200 shadow-sm'>
                {props.message !== '' && (
                    <div className='text-lg max-w-[300px] m-auto text-center mb-3'>
                        {props.message}
                    </div>
                )}
                <input
                    className='px-4 py-2 border border-gray-300 rounded-md m-1'
                    type="text"
                    value={time}
                    onChange={handleChange}
                    autoFocus
                />
                <button
                    onClick={() => {
                        setDisplay('hidden')
                        props.onClose(parseInt(time))
                    }}
                    className='bg-blue-500 text-white rounded-md hover:bg-blue-600 p-2 m-1'>Start Game</button>
            </motion.div>
        </div>
    )
}

export default Alert