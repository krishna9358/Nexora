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
    const [input, setInput] = useState('');
    const { messages, setMessages } = useContext(MessagesContext);
    const router = useRouter();

    const onGenerate = (input) => {
        if (!input?.trim()) return;
        setMessages([...messages, { role: "user", content: input }]);
        router.push('/chat');
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onGenerate(input);
        }
    }

    return (
        <div className='flex flex-col items-center px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-8rem)]'>
            <div className='w-full max-w-4xl mx-auto text-center space-y-4 mt-16 sm:mt-20 lg:mt-24'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight'>
                    {Lookup.HeroHeading}
                </h1>
                <p className='text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto'>
                    {Lookup.HeroDescription}
                </p>
            </div>

            <div className='w-full max-w-2xl mx-auto mt-8 sm:mt-12'>
                <div className='relative'>
                    <textarea 
                        value={input}
                        placeholder='Enter your prompt'
                        className='w-full p-4 rounded-xl border border-[#4A4A4A] h-32 sm:h-40 resize-none text-base placeholder:text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-md'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <div className='absolute bottom-4 right-4 flex items-center gap-3'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-sm text-gray-600'
                            title='Attach file'
                        >
                            <PhotoIcon className='w-5 h-5 sm:w-6 sm:h-6' />
                            <span className='hidden sm:inline'>Attach</span>
                        </button>
                        {input?.trim() && (
                            <button
                                onClick={() => onGenerate(input)}
                                className='p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors'
                                title='Generate'
                            >
                                <ArrowRightIcon className='w-5 h-5 sm:w-6 sm:h-6' />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full max-w-3xl mx-auto mt-8 sm:mt-12 px-4'>
                <div className='flex flex-wrap gap-3 justify-center'>
                    {Lookup.HeroSuggestions.map((suggestion) => (
                        <button
                            key={suggestion.id}
                            onClick={() => onGenerate(suggestion.title)}
                            className='px-4 py-2 border border-[#4A4A4A] rounded-full  hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap'
                        >
                            {suggestion.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero