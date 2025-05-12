"use client"
import { useState } from 'react'
import Lookup from '@/data/Lookup'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { MessagesContext } from '@/context/MessagesContext'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
function Hero() {
    const [input, setInput] = useState();
    const { messages, setMessages } = useContext(MessagesContext);
    const router = useRouter();
    const onGenerate = (input) => {
        setMessages( [...messages, { role: "user", content: input }]);
        router.push('/chat');
    }

  return (
    <div className='flex flex-col gap-2 xl:mt-28 mt-20 items-center '>
        <h2 className='text-4xl font-bold'>
            {Lookup.HeroHeading}
        </h2>
        <p className='text-lg'>
            {Lookup.HeroDescription}
        </p>

        <div className='flex flex-col gap-2 mt-10'>
            <div className='flex gap-2 items-center'>
                <div className='relative w-full xl:w-1/2'>
                    <div className='relative w-full xl:w-1/2'>
                        <textarea 
                            placeholder='Enter your prompt'
                            className='w-full p-2 pt-2 rounded-md border border-[#4A4A4A] h-40 min-w-140 placeholder:text-sm placeholder:text-[#4A4A4A] placeholder:absolute placeholder:top-2 placeholder:left-2 focus:outline-none resize-none align-top'
                            style={{verticalAlign: 'top'}}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        {input && <ArrowRightIcon 
                        onClick={() => onGenerate(input)}
                        className='w-8 h-8 bg-black text-white rounded-full p-1 absolute bottom-2 right-100 sm:-right-10 md:-right-28 lg:-right-60 xl:-right-100 cursor-pointer' />}
                        <div className='absolute bottom-2 left-2 flex items-center gap-1 cursor-pointer'>
                            <PhotoIcon className='w-8 h-8 text-black rounded-full p-1' />Attach
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-row gap-2 justify-start items-center mt-10'>
            {Lookup.HeroSuggestions.map((suggestion) => (
                <h1 key={suggestion.id} className='flex justify-start gap-2 items-center border rounded-4xl p-2 hover:bg-gray-100 cursor-pointer' onClick={() => onGenerate(suggestion.title)}>
                    <p className='text-md' >{suggestion.title}</p>
                </h1>
            ))}
        </div>
    </div>
  )
}

export default Hero