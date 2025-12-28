import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'

const ChatBox = () => {

  const containerRef = useRef(null)
  const {selectedChat, theme, user, axios, token, setUser} = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async(e) =>{
    try{
      e.preventDefault()
      if(!user) return toast('Please login to send messages')
      setLoading(true)
      const promptCopy = prompt;
      setPrompt('');
      setMessages(prev => [...prev, {role: 'user', content: prompt, timestamp: new Date(), isImage: false}])

      const {data} = await axios.post(`/api/message/${mode}`, {
        chatId: selectedChat._id, prompt, isPublished}, {headers: {Authorization: token}})
      if(data.success){
        setMessages(prev => [...prev, data.reply])
        setLoading(false)

        //decrease user credits
        if(mode === 'image'){
          setUser(prev => ({...prev, credits: prev.credits - 2}))
        }else{
          setUser(prev => ({...prev, credits: prev.credits - 1}))
        }
      }else{
        toast.error(data.message)
        setPrompt(promptCopy);
      }
    }catch(error){
      toast.error(error.message)
    }finally{
      setPrompt('');
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between h-screen p-6 md:p-8 xl:px-16 max-md:mt-12 2xl:px-32">

      {/* Chat Messages Container */}
      <div ref={containerRef} className='flex-1 mb-6 overflow-y-auto px-2'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-4 text-primary'>
            <div className="relative">
              <img 
                src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} 
                alt="Logo" 
                className="w-full max-w-64 sm:max-w-80 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-500/10 blur-3xl"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl sm:text-7xl font-light bg-gradient-to-r from-gray-600 to-gray-400 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Ask me anything!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start a conversation or generate an image
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index)=> <Message key={index} message={message} />)}

        {/* Enhanced Three Dots Loading */}
        {
          loading && (
            <div className='flex items-center gap-2 my-4'>
              <div className='loader flex items-center gap-1.5 p-4 px-6 bg-gray-100 dark:bg-[#57317C]/30 border border-gray-200 dark:border-[#80609F]/30 rounded-2xl'>
                <div className='w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-bounce'></div>
                <div className='w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-bounce'></div>
                <div className='w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-bounce'></div>
              </div>
            </div>
          )
        }
      </div>

      {/* Publish Checkbox for Image Mode */}
      {mode === 'image' && (
        <div className='flex justify-center mb-4'>
          <label className='inline-flex items-center gap-3 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all'>
            <input 
              type="checkbox" 
              className='w-4 h-4 cursor-pointer rounded' 
              checked={isPublished} 
              onChange={(e) => setIsPublished(e.target.checked)} 
            />
            <span className='text-sm font-medium text-gray-700 dark:text-purple-200'>
              Publish to community gallery
            </span>
          </label>
        </div>
      )}

      {/* Enhanced Prompt Input Box */}
      <form 
        onSubmit={onSubmit} 
        className='bg-white dark:bg-[#1a161c]/80 border-2 border-gray-200 dark:border-[#80609F]/30 rounded-2xl w-full max-w-4xl mx-auto shadow-lg hover:shadow-xl dark:shadow-purple-900/20 transition-all duration-300 backdrop-blur-sm'
      >
        <div className='flex gap-3 items-center p-4'>
          {/* Mode Selector */}
          <div className="relative">
            <select 
              onChange={(e) => setMode(e.target.value)} 
              value={mode} 
              className='appearance-none pl-4 pr-10 py-2.5 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700/50 rounded-xl text-sm font-medium cursor-pointer hover:border-purple-300 dark:hover:border-purple-600 transition-all outline-none'
            >
              <option className='bg-white dark:bg-purple-900' value="text">💬 Text</option>
              <option className='bg-white dark:bg-purple-900' value="image">🎨 Image</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-4 h-4 text-gray-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Input Field */}
          <input 
            onChange={(e) => setPrompt(e.target.value)} 
            value={prompt} 
            type='text' 
            placeholder={mode === 'text' ? 'Type your message...' : 'Describe the image you want to generate...'} 
            className='flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500' 
            required 
          />

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className='p-2.5 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 btn-hover-lift'
          >
            <img 
              src={loading ? assets.stop_icon : assets.send_icon} 
              className='w-5 h-5' 
              alt={loading ? "Stop" : "Send"} 
            />
          </button>
        </div>
      </form>

      {/* Helper Text */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  )
}

export default ChatBox