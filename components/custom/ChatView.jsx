"use client"
import React, { useContext } from 'react'
import { MessagesContext } from '@/context/MessagesContext'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
function ChatView() {
    const { messages, setMessages } = useContext(MessagesContext);
    const [input, setInput] = useState('');
    const onGenerate = (input) => {
        setMessages([...messages, { role: "user", content: input }]);
    }
  return (
    <div className='flex relative h-[76vh] flex-col'>

        <div className='flex-1 overflow-y-auto'>
            {messages?.map((message, index) => (
                <div key={index} className='flex flex-row gap-2 '>
                    <div className='flex flex-row gap-2 w-full'>
                        {message.role === "user" ? (
                            <div className='flex flex-row gap-2 items-center justify-end bg-gray-100 p-2 rounded-md ml-auto mb-2'>
                                <p>{message.content}</p>
                                <UserCircleIcon className='w-6 h-6' />
                            </div>
                        ) : (
                            <div className='flex flex-row gap-2 items-center justify-start bg-gray-100 p-2 rounded-md'>
                                <HeartIcon className='w-6 h-6' />
                                <p>{message.content}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        {/* Input Section  */}
        <div className='flex flex-row gap-2 mt-4'>

                    <div className='relative xl:w-1/2 bottom-0 '>
                        <textarea 
                            placeholder='Enter your prompt'
                            className='w-full p-2 pt-2 rounded-md border border-[#4A4A4A] h-40  min-w-78 placeholder:text-sm placeholder:text-[#4A4A4A] placeholder:absolute placeholder:top-2 placeholder:left-2 focus:outline-none resize-none align-top'
                            style={{verticalAlign: 'top'}}
                            onChange={(e) => setInput(e.target.value)}

                        />
                        {input && <ArrowRightIcon 
                        onClick={() => onGenerate(input)}
                        className='w-6 h-6 bg-black text-white rounded-full p-1 absolute bottom-2 right-100 sm:-right-10 md:-right-28 lg:-right-60 xl:-right-38 cursor-pointer' />} 
                        <div className='absolute bottom-2 left-2 flex items-center gap-1 cursor-pointer text-sm'>
                            <PhotoIcon className='w-6 h-6 text-black rounded-full p-1' />Attach
                            </div>
                    </div>
                </div>

    </div>
  )
} 

export default ChatView