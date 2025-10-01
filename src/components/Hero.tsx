'use client'

import Link from 'next/link'
import Header from './Header'

const Hero = () => {

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      
      {/* Modern Background with Geometric Shapes - Reference Style */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"></div>
        
        {/* Large glowing circles - Reference style */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-blue-600/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 rounded-full blur-2xl"></div>
        
        {/* Abstract geometric lines */}
        <div className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform rotate-45"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform rotate-30"></div>
        
        {/* Decorative dots pattern */}
        <div className="absolute top-32 right-40 grid grid-cols-4 gap-2 opacity-40">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full"></div>
          ))}
        </div>
        
        {/* Additional geometric shapes */}
        <div className="absolute bottom-40 right-20 opacity-30">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyan-400"></div>
        </div>
        <div className="absolute bottom-20 right-60 opacity-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-blue-500"></div>
        </div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[70vh] sm:min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8 max-w-2xl mx-auto md:mx-0">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight uppercase text-center md:text-left">
              <span className="block text-white mb-1 sm:mb-2">Get Access to</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                Business Funding
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0 text-center md:text-left">
              Scale your U.S. Business by accessing $50K-$150K in business capital—at 0% interest for up to 12 months.
            </p>
            
            {/* Intro Text */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0 text-center md:text-left">
              The simplest way for business owners to qualify for business capital—without high interest, complicated paperwork, or strict revenue requirements.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 justify-center md:justify-start">
              <Link 
                href="/application"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                <span className="hidden sm:inline">Get your Business Funded</span>
                <span className="sm:hidden">Get Funded</span>
              </Link>
            </div>
          </div>
          
          {/* Right Column - Credit Cards Design (visible on md+, responsive) */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              
              {/* Large glowing circle behind cards - Reference style */}
              <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-96 h-96 sm:w-[500px] sm:h-[500px] xl:w-[600px] xl:h-[600px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl -z-10 animate-pulse group-hover:animate-ping"></div>
              
              {/* Main Credit Card - Blue */}
              <div className="relative w-64 h-40 sm:w-72 sm:h-44 lg:w-80 lg:h-48 xl:w-88 xl:h-52 bg-gradient-to-r from-blue-500/60 via-blue-600/70 to-cyan-500/60 backdrop-blur-md rounded-2xl shadow-2xl transform rotate-6 lg:rotate-4 xl:rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out border border-white/30 z-20 group">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-36 sm:h-36 bg-white/5 rounded-full -translate-y-16 sm:-translate-y-18 translate-x-16 sm:translate-x-18 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-28 sm:h-28 bg-cyan-400/10 rounded-full translate-y-12 sm:translate-y-14 -translate-x-12 sm:-translate-x-14 group-hover:scale-110 group-hover:bg-cyan-400/20 transition-all duration-700"></div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-500">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-500">
                        <div className="w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors duration-500"></div>
                      </div>
                      <div className="text-xs sm:text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-500">BUSINESS</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-4 bg-white/20 rounded flex items-center justify-center group-hover:bg-white/30 transition-colors duration-500">
                        <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-sm group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-500"></div>
                      </div>
                      <div className="text-xs font-bold group-hover:scale-110 transition-transform duration-300">VISA</div>
                    </div>
                  </div>
                  
                  {/* Middle Section - Card Number */}
                  <div className="flex-1 flex items-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider group-hover:tracking-widest transition-all duration-500">5337 8622 4901 3294</div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80 mb-1 group-hover:opacity-100 transition-opacity duration-500">CARDHOLDER</div>
                      <div className="text-xs sm:text-sm font-semibold group-hover:scale-105 transition-transform duration-300">YOUR BUSINESS</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80 mb-1 group-hover:opacity-100 transition-opacity duration-500">EXP. DATE</div>
                      <div className="text-xs sm:text-sm font-semibold group-hover:scale-105 transition-transform duration-300">12/28</div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping group-hover:animate-bounce"></div>
                  <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-cyan-300/40 rounded-full animate-pulse group-hover:animate-ping delay-300"></div>
                </div>
              </div>
              
              {/* Second Credit Card - Gray (Smaller, Behind) */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 w-48 h-30 sm:w-56 sm:h-36 lg:w-64 lg:h-40 xl:w-72 xl:h-44 bg-gradient-to-r from-gray-500/60 via-gray-600/70 to-gray-400/60 backdrop-blur-md rounded-2xl shadow-xl transform -rotate-3 lg:-rotate-2 xl:-rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-700 ease-out border border-white/20 z-10 group">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 bg-white/5 rounded-full -translate-y-12 sm:-translate-y-14 translate-x-12 sm:translate-x-14 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-400/10 rounded-full translate-y-8 sm:translate-y-10 -translate-x-8 sm:-translate-x-10 group-hover:scale-110 group-hover:bg-gray-400/20 transition-all duration-700"></div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-3 sm:p-4 h-full flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-500">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-500">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors duration-500"></div>
                      </div>
                      <div className="text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-500">PERSONAL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-3 bg-white/20 rounded flex items-center justify-center group-hover:bg-white/30 transition-colors duration-500">
                        <div className="w-3 h-2 bg-gradient-to-r from-gray-400 to-gray-300 rounded-sm group-hover:from-gray-300 group-hover:to-gray-200 transition-all duration-500"></div>
                      </div>
                      <div className="text-xs font-bold group-hover:scale-110 transition-transform duration-300">VISA</div>
                    </div>
                  </div>
                  
                  {/* Middle Section - Card Number */}
                  <div className="flex-1 flex items-center">
                    <div className="text-sm sm:text-base lg:text-lg font-bold tracking-wider group-hover:tracking-widest transition-all duration-500">4532 1234 5678 9012</div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80 mb-1 group-hover:opacity-100 transition-opacity duration-500">CARDHOLDER</div>
                      <div className="text-xs font-semibold group-hover:scale-105 transition-transform duration-300">JOHN DOE</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80 mb-1 group-hover:opacity-100 transition-opacity duration-500">EXP. DATE</div>
                      <div className="text-xs font-semibold group-hover:scale-105 transition-transform duration-300">08/26</div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-gray-300/40 rounded-full animate-pulse group-hover:animate-ping delay-500"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping group-hover:animate-bounce delay-700"></div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Features Section */}
      <div className="relative z-10 bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Credit Friendly</h3>
                <p className="text-gray-300 text-sm">
                  No impact on your personal credit.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Revenue Free</h3>
                <p className="text-gray-300 text-sm">
                  No business revenue required.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Simple Process</h3>
                <p className="text-gray-300 text-sm">
                  No complicated paperwork.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default Hero
