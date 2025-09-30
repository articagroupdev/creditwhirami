'use client'

import Link from 'next/link'
import { ArrowRight, DollarSign } from 'lucide-react'

const CTA = () => {

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Access <br />
            <span className="text-blue-100">Business Funding?</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Book your call today and let&apos;s turn your business credit into real working capital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link 
              href="/application"
              className="group inline-flex items-center bg-white text-blue-600 hover:text-blue-700 font-bold text-xl px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20"
            >
              <DollarSign className="mr-3 w-6 h-6" />
              Get Funded Today
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="text-center sm:text-left">
              <p className="text-blue-100 text-sm">
                ✓ 100% free initial consultation
              </p>
              <p className="text-blue-100 text-sm">
                ✓ No commitments or hidden costs
              </p>
            </div>
          </div>
          
          <div className="pt-8">
            <div className="inline-flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Available now</span>
              </div>
              <div className="text-sm">
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
