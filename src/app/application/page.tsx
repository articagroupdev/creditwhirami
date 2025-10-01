'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Menu, X, Phone, Mail } from 'lucide-react'
import ScheduleCallModal from '@/components/ScheduleCallModal'
// import SimpleVideoPlayer from '@/components/SimpleVideoPlayer'
import About from '@/components/About'
import Features from '@/components/Features'
import BusinessFinancing from '@/components/BusinessFinancing'


const ApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/cwr-logo-2.png" 
                  alt="Credit with Rami" 
                  width={200}
                  height={80}
                  className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Phone Number */}
              <div className="hidden lg:flex items-center space-x-2 text-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span className="text-sm font-semibold text-gray-700">(555) 123-4567</span>
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
              >
                Get Funded Now
              </button>
              
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-3">
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Header */}
          <div className="md:hidden py-4">
            {/* Top Row - Logo, CTA and Menu Toggle */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image 
                    src="/cwr-logo-2.png" 
                    alt="Credit with Rami" 
                    width={120}
                    height={48}
                    className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-3 py-2 rounded-lg transition-all duration-300 shadow-lg text-xs"
                >
                  Get Funded
                </button>
                
                {/* Menu Toggle Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="py-2">
                  {/* Phone */}
                  <a 
                    href="tel:+15551234567"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">(555) 123-4567</span>
                  </a>
                  
                  {/* Email */}
                  <a 
                    href="mailto:info@creditwithrami.com"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">info@creditwithrami.com</span>
                  </a>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-1"></div>
                  
                  {/* Back to Home */}
                  <Link 
                    href="/"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Back to Home</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-10 leading-tight text-center uppercase">
            <span className="inline">Get Access To</span>
            <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> 0% Interest</span>
            <span className="inline"> Funding</span>
          </h1>
          
          {/* Video Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-gray-600 shadow-2xl">
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full rounded-xl"
                controls
                preload="metadata"
                onLoadStart={() => console.log('Video load started')}
                onLoadedMetadata={() => console.log('Video metadata loaded')}
                onCanPlay={() => console.log('Video can play')}
                onLoadedData={() => console.log('Video data loaded')}
                onError={(e) => {
                  console.error('Video error:', e);
                  const video = e.target as HTMLVideoElement;
                  console.error('Video error details:', video.error);
                  console.error('Video networkState:', video.networkState);
                  console.error('Video readyState:', video.readyState);
                }}
                style={{
                  borderRadius: '0.75rem'
                }}
              >
                <source src="/rami-video.mp4" type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
              </svg>
              Click to Schedule a Call
            </button>
          </div>

          {/* As Seen On */}
          <div className="mb-16">
            <p className="text-red-400 font-semibold mb-6 text-lg">AS SEEN ON:</p>
            <div className="flex flex-nowrap justify-center items-center gap-2 sm:gap-4 lg:gap-8 opacity-70 overflow-x-auto scrollbar-hide">
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">USA TODAY</div>
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">Bloomberg</div>
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">Entrepreneur</div>
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">Disrupt</div>
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">INFLUENCIVE</div>
              <div className="text-white font-semibold text-sm sm:text-lg bg-gray-800 px-2 sm:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0">Yahoo! Finance</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Features Section */}
      <Features />

      {/* Process Section */}
      <BusinessFinancing />

      {/* Funding Examples Section */}
      <section id="funding" className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Imagine What This Funding Could Do For You...
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Real funding amounts obtained by our clients - these could be your results too!
          </p>
          
          {/* Funding Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {fundingAmounts.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-blue-500 rounded-xl p-4 text-center hover:border-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <div className="text-xl font-bold text-blue-400 mb-2">{item.amount}</div>
                <div className="text-white text-xs mb-3 leading-tight">{item.type}</div>
                <div className="w-full h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg border border-blue-600 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                  <div className="relative z-10">
                    <svg className="w-6 h-6 text-blue-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <div className="text-blue-300 text-xs font-semibold">APPROVED</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Success Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-white text-lg">Clients Funded</div>
              <div className="text-gray-400 text-sm">Successfully helped businesses get funding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$50M+</div>
              <div className="text-white text-lg">Total Funding</div>
              <div className="text-gray-400 text-sm">Combined funding amount secured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-white text-lg">Success Rate</div>
              <div className="text-gray-400 text-sm">Of qualified applications get approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="inline-flex items-center bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              ACT NOW - LIMITED SPOTS AVAILABLE
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let&apos;s get you 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> funded!</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don&apos;t let another day pass without the funding your business needs to grow and succeed
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
              </svg>
              Click to Schedule a Call
            </button>
            <div className="text-gray-400 text-sm">
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Free consultation
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                No obligation
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Quick approval process
              </div>
            </div>
          </div>
          
          {/* Urgency Timer */}
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-400 font-semibold text-sm flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Limited time offer - Only 5 spots remaining this month!
            </p>
          </div>
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
