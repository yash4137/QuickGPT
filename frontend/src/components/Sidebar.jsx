import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Sidebar = () => {

  const {chats, setSelectedChat, theme, setTheme, user} = useAppContext()
  const [search, setSearch] = useState('')


  return (
    <div className='flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1'>
      {/* logo */}
      <img src={theme === 'dark' ? assets.logo_full: assets.logo_full_dark} alt="" className="w-full max-w-48"/>

      {/* New Chat Button */}
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
        <span className='mr-2 text-xl'>+</span>  New Chat
      </button>

      {/* Search Conversations */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
        <img src={assets.search_icon} className='w-4 not-dark:invert' alt='' />
        <input onChange={(e)=>setSearch(e.target.value)} value={search} type='text' placeholder='Search Conversations' className='text-xs placeholder:text-gray-400 outline-none' /> 
      </div>

      {/* Recent Chats */}
      {chats.length > 0 && <p className='mt-4 text-sm'> Recent Chats</p>}
      <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
        {
          chats.filter((chat)=> chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
            <div key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
              <div>
                <p className='truncate w-full'>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}
                </p>
                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                  {chat.updatedAt}
                </p>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
