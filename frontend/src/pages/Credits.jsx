import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets'
import Loading from './Loading'

const Credits = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPlans(dummyPlans)
    setLoading(false)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="w-full bg-white dark:bg-slate-950 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Select the perfect credit package for your needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                plan._id === 'pro'
                  ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 md:scale-105 shadow-2xl'
                  : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }`}
            >
              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
                }}
              />

              {/* Popular Badge */}
              {plan._id === 'pro' && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-300 to-orange-400 py-2 px-4 text-center z-10">
                  <span className="text-sm font-bold text-gray-900">⭐ Most Popular</span>
                </div>
              )}

              {/* Content */}
              <div className={`relative z-10 p-8 flex flex-col h-full ${plan._id === 'pro' ? 'pt-16' : ''}`}>

                {/* Plan Name */}
                <h3 className={`text-3xl font-bold mb-4 ${
                  plan._id === 'pro' ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={`text-5xl font-black ${
                    plan._id === 'pro' ? 'text-white' : 'text-purple-600 dark:text-purple-400'
                  }`}>
                    ${plan.price}
                  </span>
                  <span className={`text-base font-medium ${
                    plan._id === 'pro' ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    /{plan.credits} credits
                  </span>
                </div>

                {/* Features */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan._id === 'pro' ? 'text-white' : 'text-purple-600 dark:text-purple-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={`text-sm font-medium ${
                          plan._id === 'pro'
                            ? 'text-white/90'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold text-base transition-all duration-300 hover:shadow-lg active:scale-95 mb-3 ${
                    plan._id === 'pro'
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                  }`}
                >
                  {plan._id === 'pro' ? 'Get Started Now →' : 'Buy Credits →'}
                </button>

                {/* Footer text */}
                <p className={`text-center text-xs font-medium ${
                  plan._id === 'pro'
                    ? 'text-white/70'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  Instant activation • No credit card required
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 mb-8" />

        {/* Trust Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wider">
            Trusted by thousands of users
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700/50 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Secure Payment</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700/50 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Instant Activation</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700/50 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits