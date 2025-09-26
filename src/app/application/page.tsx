'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import ScheduleCallModal from '@/components/ScheduleCallModal'

const ApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample funding amounts for the grid
  const fundingAmounts = [
    { amount: "$134K", type: "RECEIVED IN FUNDING" },
    { amount: "$102K", type: "OF CAPITAL" },
    { amount: "$180.5K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$140K", type: "RECEIVED IN FUNDING" },
    { amount: "$126.5K", type: "OF CAPITAL" },
    { amount: "$150.5K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$99K", type: "RECEIVED IN FUNDING" },
    { amount: "$95K", type: "OF CAPITAL" },
    { amount: "$110K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$80K", type: "RECEIVED IN FUNDING" },
    { amount: "$76K", type: "OF CAPITAL" },
    { amount: "$99K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$102K", type: "RECEIVED IN FUNDING" },
    { amount: "$113K", type: "OF CAPITAL" },
    { amount: "$100K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$104K", type: "RECEIVED IN FUNDING" },
    { amount: "$85K", type: "OF CAPITAL" },
    { amount: "$121K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$83.6K", type: "RECEIVED IN FUNDING" },
    { amount: "$90K", type: "OF CAPITAL" },
    { amount: "$100K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$133K", type: "RECEIVED IN FUNDING" },
    { amount: "$80K", type: "OF CAPITAL" },
    { amount: "$100K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$110K", type: "RECEIVED IN FUNDING" },
    { amount: "$109.5K", type: "OF CAPITAL" },
    { amount: "$108K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$124.5K", type: "RECEIVED IN FUNDING" },
    { amount: "$114K", type: "OF CAPITAL" },
    { amount: "$138.3K", type: "OF 0% INTEREST CREDIT" },
    { amount: "$149K", type: "RECEIVED IN FUNDING" },
    { amount: "$150.5K", type: "OF CAPITAL" }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 p-10">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/cwr-logo-2.png" 
                alt="Credit with Rami" 
                width={300}
                height={200}
                className="h-50 w-auto p-10"
              />
            </Link>
            
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8">
            Get Access To 0% Interest Funding
          </h1>
          
          {/* 4 Methods Box */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-green-400 mb-4">4 METHODS</h2>
            <h3 className="text-xl font-semibold text-white mb-4">Equity Partner</h3>
            <ul className="text-white space-y-2 text-left">
              <li>• Have to give up ownership, control, and profits</li>
              <li>• Complications on running the business the way you want to</li>
            </ul>
            <div className="flex justify-end mt-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Click to Schedule a Call
            </button>
          </div>

          {/* As Seen On */}
          <div className="mb-16">
            <p className="text-red-400 font-semibold mb-4">AS SEEN ON:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">USA TODAY</div>
              <div className="text-white font-semibold">Bloomberg</div>
              <div className="text-white font-semibold">Entrepreneur</div>
              <div className="text-white font-semibold">Disrupt</div>
              <div className="text-white font-semibold">INFLUENCIVE</div>
              <div className="text-white font-semibold">Yahoo! Finance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our Clients Are Saying About Us...
          </h2>
          
          {/* Testimonial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(13)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 h-48 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-sm">Client Testimonial {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Examples Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Imagine What This Funding Could Do For You...
          </h2>
          
          {/* Funding Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {fundingAmounts.map((item, index) => (
              <div key={index} className="bg-gray-800 border-2 border-green-500 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">{item.amount}</div>
                <div className="text-white text-xs mb-3">{item.type}</div>
                <div className="w-full h-16 bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                  <div className="text-gray-400 text-xs">Approval Screenshot</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Let&apos;s get you funded!
          </h2>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Click to Schedule a Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-4">
              © 2025 Credit with Rami. All rights reserved.
            </p>
            <div className="space-y-2 text-xs">
              <p>
                This website is not a part of Facebook or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. 
                FACEBOOK is a trademark of FACEBOOK, Inc.
              </p>
              <p>
                Results may vary. Individual results are not typical and individual results will vary. 
                The testimonials on this page are in no way a guarantee of results.
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Schedule Call Modal */}
      <ScheduleCallModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}

export default ApplicationPage
