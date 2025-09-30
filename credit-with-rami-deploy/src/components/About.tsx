'use client'

import Image from 'next/image'
import { Heart, DollarSign, Gift } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What&apos;s the <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">catch?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            It&apos;s simple: build the right profile, and unlock 0% business funding.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column - Photo and Visual Elements */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {/* Main Photo */}
              <div className="relative">
                <Image 
                  src="/images/rami/rami-about.jpeg" 
                  alt="Rami - Financial Services Expert" 
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
                />
                
                {/* Decorative elements - Hidden on mobile, visible on larger screens */}
                <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20"></div>
                <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-15"></div>
              </div>
              
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            
            {/* Personal Story */}
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How You Get Funded</h3>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  I&apos;m Rami Noureddine, a former Business Banker who saw too many business owners get denied the funding they needed. 
                  Back then, my job was just to take applications—and it frustrated me knowing exactly what banks were looking for 
                  but not being able to guide people through it.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  That&apos;s why I built a better way. Now, I help business owners prepare their credit the right way and unlock 
                  $50K-$150K in funding at 0% interest for up to 12 months.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  No complicated paperwork, no impossible requirements—just a clear process that gets your business funded.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* What We Stand For */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          {/* Get Funded */}
          <div className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Get Funded</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Access capital at 0% interest without the usual roadblocks.
            </p>
          </div>

          {/* Earn While You Spend */}
          <div className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Earn While You Spend</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Use credit card points to cover flights and travel.
            </p>
          </div>

          {/* What We Stand For */}
          <div className="text-center p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">What We Stand For</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Transparency, clarity, and results you can trust.
            </p>
          </div>
        </div>


      </div>
    </section>
  )
}

export default About