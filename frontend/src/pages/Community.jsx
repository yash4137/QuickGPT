import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const Community = () => {

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all', 'recent', 'popular'
  const {axios} = useAppContext();

  const fetchImages = async () => {
    try{
      const {data} = await axios.get('/api/user/published-images');
      if(data.success){
        setImages(data.images);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchImages()
  }, [])

  if(loading) return <Loading />

  return (
    <div className='w-full h-screen overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-transparent dark:to-transparent'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12'>
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700/50 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Gallery
              </div>
              <h1 className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3'>
                Community Gallery
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore amazing AI-generated images from our creative community
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-white dark:bg-purple-600 text-gray-900 dark:text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('recent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'recent' 
                    ? 'bg-white dark:bg-purple-600 text-gray-900 dark:text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Recent
              </button>
              <button 
                onClick={() => setFilter('popular')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'popular' 
                    ? 'bg-white dark:bg-purple-600 text-gray-900 dark:text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Popular
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700/30 rounded-2xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{images.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Images</p>
            </div>
            <div className="text-center border-x border-purple-200 dark:border-purple-700/30">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">42</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Contributors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">1.2k</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Views</p>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        {images.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {images.map((item, index) => (
              <a 
                key={index}  
                href={item.imageUrl} 
                target='_blank' 
                rel="noopener noreferrer"
                className='group relative block rounded-2xl overflow-hidden border border-gray-200 dark:border-purple-700/30 shadow-md hover:shadow-2xl transition-all duration-500 card-hover bg-white dark:bg-[#1a161c]/80'
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={item.imageUrl} 
                    alt={`Created by ${item.userName}`}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out' 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Creator Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {item.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{item.userName}</p>
                        <p className="text-white/70 text-xs">AI Artist</p>
                      </div>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="p-3 flex items-center justify-between bg-gray-50 dark:bg-[#1a161c]/60">
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {Math.floor(Math.random() * 500) + 50}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {Math.floor(Math.random() * 100) + 10}
                    </span>
                  </div>
                  <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors">
                    Share
                  </button>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>No Images Yet</h3>
            <p className='text-center text-gray-600 dark:text-gray-400 max-w-md'>
              Be the first to share your AI-generated masterpiece with the community!
            </p>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg btn-hover-lift transition-all">
              Create Your First Image
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Community