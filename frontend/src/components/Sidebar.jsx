import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'


const Sidebar = ({isMenuOpen, setIsMenuOpen}) => {

  const {chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token} = useAppContext()
  const [search, setSearch] = useState('')

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
  }

  const deleteChat = async(e, chatId) => {
    try{
      e.stopPropagation();
      const confirm = window.confirm('Are you sure you want to delete this chat?');
      if(!confirm) return;
      const {data} = await axios.post('/api/chat/delete',{chatId}, {headers: {Authorization: token}});
      if(data.success){
        setChats(prev => prev.filter(chat => chat._id !== chatId));
        await fetchUsersChats();
        toast.success(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className={`flex flex-col h-screen min-w-80 p-6 bg-white/95 dark:bg-gradient-to-b dark:from-[#1a161c]/95 dark:to-[#000000]/95 border-r border-gray-200 dark:border-[#80609F]/20 backdrop-blur-xl transition-all duration-500 max-md:absolute left-0 z-50 shadow-xl max-md:shadow-2xl ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      
      {/* Logo Section */}
      <div className="mb-8">
        <img 
          src={theme === 'dark' ? assets.logo_full: assets.logo_full_dark} 
          alt="Logo" 
          className="w-full max-w-48 mx-auto"
        />
      </div>

      {/* New Chat Button */}
      <button onClick={createNewChat} className='flex justify-center items-center w-full py-3 px-4 text-white font-medium bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-xl cursor-pointer btn-hover-lift shadow-lg hover:shadow-xl transition-all duration-300'>
        <span className='mr-2 text-xl font-light'>+</span>
        <span>New Chat</span>
      </button>

      {/* Search Conversations */}
      <div className='flex items-center gap-3 p-3.5 mt-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-gray-300 dark:hover:border-white/20 transition-all'>
        <img src={assets.search_icon} className='w-4 opacity-60 not-dark:invert' alt='Search' />
        <input 
          onChange={(e)=>setSearch(e.target.value)} 
          value={search} 
          type='text' 
          placeholder='Search conversations...' 
          className='flex-1 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none bg-transparent' 
        /> 
      </div>

      {/* Recent Chats Section */}
      {chats.length > 0 && (
        <div className="mt-6">
          <h3 className='text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-2'>
            Recent Chats
          </h3>
        </div>
      )}
      
      <div className='flex-1 overflow-y-auto mt-1 text-sm space-y-2 pr-1'>
        {
          chats.filter((chat)=> chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
            <div 
              onClick={()=> {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false)}} 
              key={chat._id} 
              className='p-3 px-4 bg-gray-50 dark:bg-[#57317C]/10 border border-gray-200 dark:border-[#80609F]/15 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20 hover:border-gray-300 dark:hover:border-[#80609F]/30 transition-all duration-200 group'
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className='truncate text-gray-800 dark:text-white font-medium mb-1'>
                    {chat.messages.length > 0 ? chat.messages[0].content.slice(0,35) : chat.name}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>
                <img 
                  src={assets.bin_icon} 
                  className='opacity-0 group-hover:opacity-100 w-4 ml-2 cursor-pointer not-dark:invert transition-opacity duration-200' 
                  alt='' 
                  onClick={e => toast.promise(deleteChat(e, chat._id), {loading: 'deleting...' })}
                />
              </div>
            </div>
          ))
        }
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 mt-4">
        
        {/* Community Images */}
        <div 
          onClick={() => {navigate('/community'); setIsMenuOpen(false)}} 
          className='flex items-center gap-3 p-3.5 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700/30 rounded-xl cursor-pointer hover:shadow-md dark:hover:shadow-purple-900/20 transition-all duration-300 group'
        >
          <div className="p-2 bg-white dark:bg-purple-800/30 rounded-lg">
            <img src={assets.gallery_icon} className='w-5 not-dark:invert' alt='Gallery' />
          </div>
          <div className='flex-1'>
            <p className="font-medium text-sm text-gray-800 dark:text-white">Community Images</p>
            <p className="text-xs text-gray-600 dark:text-purple-200">Explore creations</p>
          </div>
        </div>

        {/* Credits Purchase */}
        <div 
          onClick={() => {navigate('/credits'); setIsMenuOpen(false)}} 
          className='flex items-center gap-3 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700/30 rounded-xl cursor-pointer hover:shadow-md dark:hover:shadow-amber-900/20 transition-all duration-300 group'
        >
          <div className="p-2 bg-white dark:bg-amber-800/30 rounded-lg">
            <img src={assets.diamond_icon} className='w-5 dark:invert' alt='Credits' />
          </div>
          <div className='flex-1'>
            <p className="font-semibold text-sm text-gray-800 dark:text-white">
              {user?.credits || 0} Credits
            </p>
            <p className="text-xs text-gray-600 dark:text-amber-200">Purchase more</p>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className='flex items-center justify-between gap-3 p-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl'>
          <div className='flex items-center gap-3'>
            <div className="p-2 bg-white dark:bg-purple-800/30 rounded-lg">
              <img src={assets.theme_icon} className='w-4 not-dark:invert' alt="Theme" />
            </div>
            <p className="font-medium text-sm text-gray-800 dark:text-white">Dark Mode</p>
          </div>
          <label className='relative inline-flex cursor-pointer'>
            <input 
              onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} 
              type='checkbox' 
              className='sr-only peer' 
              checked={theme === 'dark'} 
            />
            <div className='w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600 transition-all duration-300 shadow-inner'>
            </div>
            <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-md'></span>
          </label>
        </div>
        
        {/* User Account */}
        {/* <div className='flex items-center gap-3 p-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 group'>
          <img src={assets.user_icon} className='w-9 h-9 rounded-full border-2 border-gray-200 dark:border-purple-600' alt='User' />
          <p className='flex-1 text-sm font-medium text-gray-800 dark:text-primary truncate'>
            {user ? user.name : 'Login your account'}
          </p>
          {user && (
            <img 
              onClick={logout}
              src={assets.logout_icon} 
              className='opacity-0 group-hover:opacity-100 h-5 cursor-pointer not-dark:invert transition-opacity duration-200' 
              alt="Logout"
            />
          )}
        </div> */}
        {/* User Account */}
        <div className='flex items-center gap-3 p-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 group'>
          <img src={assets.user_icon} className='w-9 h-9 rounded-full border-2 border-gray-200 dark:border-purple-600' alt='User' />
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-800 dark:text-primary truncate'>
              {user ? user.name : 'Login your account'}
            </p>
            {user && (
              <p className='text-xs text-gray-500 dark:text-[#B1A6C0] truncate'>
                {user.email}
              </p>
            )}
          </div>
          {user && (
            <img 
              onClick={logout}
              src={assets.logout_icon} 
              className='opacity-0 group-hover:opacity-100 h-5 cursor-pointer not-dark:invert transition-opacity duration-200 flex-shrink-0' 
              alt="Logout"
            />
          )}
        </div>
      </div>

      {/* Close button for mobile */}
      <img 
        onClick={()=> setIsMenuOpen(false)} 
        src={assets.close_icon} 
        className='absolute top-4 right-4 w-6 h-6 cursor-pointer md:hidden not-dark:invert hover:scale-110 transition-transform' 
        alt="Close" 
      />
      
    </div>
  )
}

export default Sidebar
