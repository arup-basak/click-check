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
                    <div className='text-xl max-w-[300px] m-auto text-center mb-4'>
                        {props.message}
                    </div>
                )}
                <div className="flex flex-col">
                    <label htmlFor="timeInput" className="mb-2 text-sm">
                        Set Game Duration in Seconds:
                    </label>
                    <div className="flex items-center">
                        <input
                            id="timeInput"
                            className="px-4 py-2 border border-gray-300 rounded-md m-1"
                            type="text"
                            value={time}
                            onChange={handleChange}
                            autoFocus
                        />
                        <button
                            onClick={() => {
                                setDisplay('hidden');
                                props.onClose(parseInt(time));
                            }}
                            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-4 py-2 ml-2"
                        >
                            Start Game
                        </button>
                    </div>
                </div>


            </motion.div>
        </div>
    )
}

export default Alert