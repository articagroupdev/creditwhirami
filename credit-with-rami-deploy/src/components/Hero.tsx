'use client'

import Link from 'next/link'
import Header from './Header'

const Hero = () => {

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      
      {/* Modern Background with Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"></div>
        
        {/* Geometric shapes in brand colors */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-blue-600/15 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-blue-600/25 to-cyan-400/25 rounded-full blur-2xl"></div>
        </div>
        
        {/* Decorative dots pattern */}
        <div className="absolute top-32 right-40 grid grid-cols-4 gap-2 opacity-60">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-cyan-400 rounded-full"></div>
          ))}
        </div>
        
        {/* Decorative triangles */}
        <div className="absolute bottom-40 right-20 opacity-40">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-cyan-400"></div>
        </div>
        <div className="absolute bottom-20 right-60 opacity-30">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-blue-500"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white mb-2">Get Access to</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                Business Funding
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Scale your U.S. Business by accessing $50K-$150K in business capital—at 0% interest for up to 12 months.
            </p>
            
            {/* Intro Text */}
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              The simplest way for business owners to qualify for business capital—without high interest, complicated paperwork, or strict revenue requirements.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/application"
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                Get your Business Funded
              </Link>
            </div>
          </div>
          
          {/* Right Column - Credit Card Design */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Credit Card Design */}
              <div className="relative w-80 h-48 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/20 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium opacity-80">BUSINESS CREDIT</div>
                    <div className="text-xs font-bold">VISA</div>
                  </div>
                  
                  {/* Middle Section */}
                  <div className="flex-1 flex items-center">
                    <div className="text-2xl font-bold tracking-wider">•••• •••• •••• 1234</div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80 mb-1">CARDHOLDER NAME</div>
                      <div className="text-sm font-semibold">YOUR BUSINESS</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                      <div className="text-sm font-semibold">12/28</div>
                    </div>
                  </div>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              
              {/* Decorative geometric shape behind card */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-2xl -z-10"></div>
              
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
