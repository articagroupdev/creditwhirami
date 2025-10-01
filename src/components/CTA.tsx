'use client'

import Link from 'next/link'
import { ArrowRight, DollarSign } from 'lucide-react'

const CTA = () => {

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Access <br className="hidden sm:block" />
            <span className="text-blue-100">Business Funding?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
          Book a call today and let’s get your business funded.

          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8">
            <Link 
              href="/application"
              className="group inline-flex items-center bg-white text-blue-600 hover:text-blue-700 font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
            >
              <DollarSign className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Get Funded Today</span>
              <span className="sm:hidden">Get Funded</span>
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="text-center sm:text-left space-y-1">
              <p className="text-blue-100 text-xs sm:text-sm">
              ✓ Complimentary initial consultation
              </p>
              <p className="text-blue-100 text-xs sm:text-sm">
                ✓ No commitments or hidden costs
              </p>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Available now</span>
              </div>
              <div className="text-xs sm:text-sm">
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
