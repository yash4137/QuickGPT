// import React, { useEffect } from 'react'
// import { assets } from '../assets/assets'
// import moment from 'moment'
// import Markdown from 'react-markdown'
// import Prism from 'prismjs'

// const Message = ({message}) => {

//   useEffect(()=>{
//     Prism.highlightAll();
//   }, [message.content])

//   return (
//     <div>
//       {message.role === 'user' ? (
//         <div className='flex items-start justify-end my-6 gap-3 message-enter-right'>
//           <div className='flex flex-col gap-2 p-4 px-5 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#57317C]/40 dark:to-[#3D81F6]/20 border border-purple-200 dark:border-[#80609F]/30 rounded-2xl rounded-tr-md max-w-2xl shadow-sm hover:shadow-md transition-shadow duration-200'>
//             <p className='text-sm leading-relaxed text-gray-800 dark:text-white'>{message.content}</p>
//             <div className="flex items-center gap-2">
//               <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
//             </div>
//           </div>
//           <div className="relative">
//             <img 
//               src={assets.user_icon} 
//               alt="User" 
//               className='w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-600 shadow-sm' 
//             />
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-md -z-10"></div>
//           </div>
//         </div>
//       ) : (
//         <div className='flex items-start gap-3 my-6 message-enter-left'>
//           <div className="relative flex-shrink-0">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/30 blur-md -z-10"></div>
//           </div>
          
//           <div className='flex flex-col gap-2 p-4 px-5 max-w-2xl bg-white dark:bg-[#1a161c]/60 border border-gray-200 dark:border-[#80609F]/30 rounded-2xl rounded-tl-md shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm'>
//             {message.isImage ? (
//               <div className="space-y-2">
//                 <img 
//                   src={message.content} 
//                   alt='Generated' 
//                   className='w-full max-w-lg mt-2 rounded-xl shadow-lg border border-gray-200 dark:border-purple-700/30'
//                 />
//                 <div className="flex gap-2">
//                   <button className="px-3 py-1.5 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 border border-purple-300 dark:border-purple-700/50 rounded-lg transition-colors">
//                     Download
//                   </button>
//                   <button className="px-3 py-1.5 text-xs bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 border border-blue-300 dark:border-blue-700/50 rounded-lg transition-colors">
//                     Regenerate
//                   </button>
//                 </div>
//               </div>
//             ):
//             (
//               <div className='text-sm leading-relaxed text-gray-800 dark:text-gray-100 reset-tw'>
//                 <Markdown>{message.content}</Markdown>
//               </div>
//             )}
//             <div className="flex items-center gap-2 pt-1">
//               <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
//               {!message.isImage && (
//                 <>
//                   <span className="text-gray-300 dark:text-gray-600">•</span>
//                   <button className="text-xs text-gray-500 dark:text-[#B1A6C0] hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
//                     Copy
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Message

import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import toast from 'react-hot-toast'

const Message = ({message}) => {

  useEffect(()=>{
    Prism.highlightAll();
  }, [message.content])

  // Download image
  const handleDownload = async () => {
    try {
      const response = await fetch(message.content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quickgpt-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  // Regenerate image
  const handleRegenerate = () => {
    toast.error('Regenerate feature coming soon!');
    // TODO: Implement regenerate functionality
  };

  // Copy text/code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div>
      {message.role === 'user' ? (
        <div className='flex items-start justify-end my-6 gap-3 message-enter-right'>
          <div className='flex flex-col gap-2 p-4 px-5 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-[#57317C]/40 dark:to-[#3D81F6]/20 border border-purple-200 dark:border-[#80609F]/30 rounded-2xl rounded-tr-md max-w-2xl shadow-sm hover:shadow-md transition-shadow duration-200'>
            <p className='text-sm leading-relaxed text-gray-800 dark:text-white'>{message.content}</p>
            <div className="flex items-center gap-2">
              <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
            </div>
          </div>
          <div className="relative">
            <img 
              src={assets.user_icon} 
              alt="User" 
              className='w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-600 shadow-sm' 
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-md -z-10"></div>
          </div>
        </div>
      ) : (
        <div className='flex items-start gap-3 my-6 message-enter-left'>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/30 blur-md -z-10"></div>
          </div>
          
          <div className='flex flex-col gap-2 p-4 px-5 max-w-2xl bg-white dark:bg-[#1a161c]/60 border border-gray-200 dark:border-[#80609F]/30 rounded-2xl rounded-tl-md shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm'>
            {message.isImage ? (
              <div className="space-y-2">
                <img 
                  src={message.content} 
                  alt='Generated' 
                  className='w-full max-w-lg mt-2 rounded-xl shadow-lg border border-gray-200 dark:border-purple-700/30'
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleDownload}
                    className="px-3 py-1.5 text-xs bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 border border-purple-300 dark:border-purple-700/50 rounded-lg transition-colors">
                    Download
                  </button>
                  <button 
                    onClick={handleRegenerate}
                    className="px-3 py-1.5 text-xs bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 border border-blue-300 dark:border-blue-700/50 rounded-lg transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
            ):
            (
              <div className='text-sm leading-relaxed text-gray-800 dark:text-gray-100 reset-tw'>
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            <div className="flex items-center gap-2 pt-1">
              <span className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
              {!message.isImage && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <button 
                    onClick={handleCopy}
                    className="text-xs text-gray-500 dark:text-[#B1A6C0] hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Copy
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message