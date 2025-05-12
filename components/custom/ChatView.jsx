"use client"
import React, { useContext } from 'react'
import { MessagesContext } from '@/context/MessagesContext'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Prompt from '@/data/Prompt'

function ChatView() {
    const { messages, setMessages } = useContext(MessagesContext);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onGenerate = (input) => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", content: input }]);
        setInput('');
    }

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === "user") {
                getAiResponse();
            }
        }
    }, [messages]);

    const getAiResponse = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/ai-chat', { messages });
            
            if (response.data.result) {
                setMessages(prev => [...prev, response.data.result]);
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            // Optionally show an error message to the user
            setMessages(prev => [...prev, { 
                role: "assistant", 
                content: "I apologize, but I encountered an error. Please try again." 
            }]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onGenerate(input);
        }
    }

    return (
        <div className='flex flex-col h-[87vh] '>
            {/* Messages Container */}
            <div className='flex-1 overflow-y-scroll px-4 py-6 space-y-4 scrollbar-hide'>
                {messages?.map((message, index) => (
                    <div key={index} className='flex flex-col gap-2 w-full'>
                        {message.role === "user" ? (
                            <div className='flex items-start gap-2 ml-auto max-w-[80%]'>
                                <div className='bg-black text-white p-3 rounded-2xl rounded-tr-none'>
                                    <p className='text-sm md:text-base whitespace-pre-wrap'>{message.content}</p>
                                </div>
                                <UserCircleIcon className='w-8 h-8 flex-shrink-0' />
                            </div>
                        ) : (
                            <div className='flex items-start gap-2 w-full'>
                                <HeartIcon className='w-8 h-8 flex-shrink-0' />
                                <div className='bg-gray-100 p-3 rounded-2xl rounded-tl-none'>
                                    <p className='text-sm md:text-base whitespace-pre-wrap'>{message.content}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className='flex items-start gap-2 max-w-[80%]'>
                        <HeartIcon className='w-8 h-8 flex-shrink-0 animate-pulse' />
                        <div className='bg-gray-100 p-3 rounded-2xl rounded-tl-none'>
                            <div className='flex space-x-2'>
                                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                                <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Container */}
            <div className='p-4'>
                <div className='relative max-w-4xl mx-auto '>
                    <textarea 
                        value={input}
                        placeholder='Type your message...'
                        className='w-full p-4 pr-24 rounded-xl border border-[#4A4A4A] focus:border-black focus:ring-1 focus:ring-black h-[120px] resize-none text-sm md:text-base placeholder:text-[#4A4A4A] shadow-md'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                    />
                    <div className='absolute bottom-4 right-4 flex items-center gap-2'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            title='Attach file'
                            disabled={isLoading}
                        >
                            <PhotoIcon className='w-6 h-6 text-gray-600' />
                        </button>
                        {input.trim() && (
                            <button 
                                onClick={() => onGenerate(input)}
                                className='p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                title='Send message'
                                disabled={isLoading}
                            >
                                <ArrowRightIcon className='w-6 h-6' />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatView