'use client'

import Image from 'next/image'
import { Heart, DollarSign, Gift } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What&apos;s the <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">catch?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            It&apos;s simple: build the right profile, and unlock 0% business funding.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Column - Photo and Visual Elements */}
          <div className="relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Photo */}
              <div className="relative">
                <Image 
                  src="/images/rami/rami-about.jpeg" 
                  alt="Rami - Financial Services Expert" 
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-15"></div>
              </div>
              
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            
            {/* Personal Story */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How You Get Funded</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                I&apos;m Rami Noureddine, a former Business Banker who saw too many business owners get denied the funding they needed. 
                Back then, my job was just to take applications—and it frustrated me knowing exactly what banks were looking for 
                but not being able to guide people through it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That&apos;s why I built a better way. Now, I help business owners prepare their credit the right way and unlock 
                $50K-$150K in funding at 0% interest for up to 12 months.
              </p>
              <p className="text-gray-600 leading-relaxed">
                No complicated paperwork, no impossible requirements—just a clear process that gets your business funded.
              </p>
            </div>

          </div>
        </div>

        {/* What We Stand For */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          
          {/* Get Funded */}
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get Funded</h3>
            <p className="text-gray-600 leading-relaxed">
              Access capital at 0% interest without the usual roadblocks.
            </p>
          </div>

          {/* Earn While You Spend */}
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Earn While You Spend</h3>
            <p className="text-gray-600 leading-relaxed">
              Use credit card points to cover flights and travel.
            </p>
          </div>

          {/* What We Stand For */}
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">What We Stand For</h3>
            <p className="text-gray-600 leading-relaxed">
              Transparency, clarity, and results you can trust.
            </p>
          </div>
        </div>


      </div>
    </section>
  )
}

export default About