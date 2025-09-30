'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Menu, X, Phone, Mail } from 'lucide-react'
import ScheduleCallModal from '@/components/ScheduleCallModal'

// Avatar component that can handle both vector and AI-generated avatars
const AvatarComponent = ({ testimonial }: { testimonial: { name: string; gender: string; initials: string; avatarId: string } }) => {
  // Generate AI avatar URLs using realistic face generation
  const getAvatarUrl = (avatarId: string, gender: string) => {
    // Using multiple avatar services for variety and reliability
    const services = [
      // Service 1: DiceBear Personas (most realistic)
      () => {
        const seed = avatarId.replace(/_/g, '');
        const baseUrl = `https://api.dicebear.com/7.x/personas/png`;
        const params = new URLSearchParams({
          seed: seed,
          size: '128',
          backgroundColor: gender === 'female' ? 'ffb6c1' : '4f46e5',
          hairColor: 'auburn,black,blonde,brown,chestnut,platinum,red',
          skinColor: 'fdbcb4,edb98a,fd9841,f8d25c,ae5d29,614335,092e4e',
          eyeColor: 'blue,green,brown,hazel'
        });
        return `${baseUrl}?${params.toString()}`;
      },
      
      // Service 2: DiceBear Avataaars (cartoon style)
      () => {
        const seed = avatarId.replace(/_/g, '');
        const baseUrl = `https://api.dicebear.com/7.x/avataaars/png`;
        const params = new URLSearchParams({
          seed: seed,
          size: '128',
          backgroundColor: gender === 'female' ? 'ffb6c1' : '4f46e5'
        });
        return `${baseUrl}?${params.toString()}`;
      },
      
      // Service 3: UI Avatars (initials-based)
      () => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=${gender === 'female' ? 'ff69b4' : '4f46e5'}&color=fff&size=128&bold=true&format=png`;
      }
    ];
    
    // Use the first service (most realistic)
    return services[0]();
  };

  const avatarUrl = getAvatarUrl(testimonial.avatarId, testimonial.gender);

  if (avatarUrl) {
    // Use AI-generated avatar with error handling
    return (
      <div className="relative">
        <Image
          src={avatarUrl}
          alt={testimonial.name}
          width={64}
          height={64}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-white shadow-lg object-cover group-hover:shadow-xl transition-shadow duration-300"
          onError={(e) => {
            // Fallback to vector avatar if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-white shadow-lg flex items-center justify-center relative overflow-hidden ${
                  testimonial.gender === 'female' 
                    ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600' 
                    : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700'
                }">
                  <div class="text-white font-bold text-sm sm:text-lg">${testimonial.initials}</div>
                </div>
              `;
            }
          }}
        />
      </div>
    );
  }

  // Use vector avatar
  return (
    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-white shadow-lg flex items-center justify-center relative overflow-hidden group-hover:shadow-xl transition-shadow duration-300 ${
      testimonial.gender === 'female' 
        ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600' 
        : 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700'
    }`}>
      {testimonial.gender === 'female' ? (
        <div className="relative w-full h-full">
          {/* Face */}
          <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full opacity-80"></div>
          {/* Hair */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-3 sm:h-4 bg-white rounded-t-full opacity-60"></div>
          {/* Body */}
          <div className="absolute bottom-0 sm:bottom-1 left-1/2 transform -translate-x-1/2 w-3 sm:w-4 h-4 sm:h-6 bg-white rounded-t-lg opacity-70"></div>
          {/* Eyes */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gray-600 rounded-full"></div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gray-600 rounded-full"></div>
          {/* Smile */}
          <div className="absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 h-0.5 sm:h-1 border-b border-gray-600 rounded-full"></div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Face */}
          <div className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full opacity-80"></div>
          {/* Hair */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 sm:w-7 h-2 sm:h-3 bg-white rounded-t-lg opacity-60"></div>
          {/* Body */}
          <div className="absolute bottom-0 sm:bottom-1 left-1/2 transform -translate-x-1/2 w-3 sm:w-4 h-4 sm:h-6 bg-white rounded-t-lg opacity-70"></div>
          {/* Eyes */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gray-600 rounded-full"></div>
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gray-600 rounded-full"></div>
          {/* Smile */}
          <div className="absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 h-0.5 sm:h-1 border-b border-gray-600 rounded-full"></div>
        </div>
      )}
      
      {/* Fallback to initials if needed */}
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs sm:text-sm opacity-0 hover:opacity-100 transition-opacity">
        {testimonial.initials}
      </div>
    </div>
  );
};

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

  // Client testimonials with AI-generated avatars
  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Elite Restaurant Group",
      amount: "$134K",
      gender: "female",
      initials: "SJ",
      avatarId: "sarah_johnson",
      testimonial: "Rami helped me secure the funding I needed to expand my restaurant chain. The process was fast and hassle-free. Highly recommended!"
    },
    {
      name: "Michael Rodriguez",
      business: "Premier Construction",
      amount: "$180.5K",
      gender: "male",
      initials: "MR",
      avatarId: "michael_rodriguez",
      testimonial: "Thanks to Rami, I was able to access interest-free capital for my construction company. His expertise and knowledge of the financial market are exceptional."
    },
    {
      name: "Emily Chen",
      business: "Fashion Forward Boutique",
      amount: "$102K",
      gender: "female",
      initials: "EC",
      avatarId: "emily_chen",
      testimonial: "Rami's team guided me step by step to get the perfect funding for my boutique. First-class professionals."
    },
    {
      name: "David Thompson",
      business: "Tech Innovations Inc",
      amount: "$150.5K",
      gender: "male",
      initials: "DT",
      avatarId: "david_thompson",
      testimonial: "Rami transformed my tech business with his funding strategy. Now I have the capital needed to grow exponentially."
    },
    {
      name: "Lisa Martinez",
      business: "Beauty & Style Salon",
      amount: "$126.5K",
      gender: "female",
      initials: "LM",
      avatarId: "lisa_martinez",
      testimonial: "Incredible experience working with Rami. I got the funding I needed to modernize my salon without compromising my assets."
    },
    {
      name: "James Wilson",
      business: "Express Logistics",
      amount: "$140K",
      gender: "male",
      initials: "JW",
      avatarId: "james_wilson",
      testimonial: "Rami helped me access capital to expand my transportation fleet. His knowledge of the financial market is impressive."
    },
    {
      name: "Jennifer Davis",
      business: "Business Consulting Pro",
      amount: "$99K",
      gender: "female",
      initials: "JD",
      avatarId: "jennifer_davis",
      testimonial: "The funding process with Rami was transparent and efficient. I recommend his services to any entrepreneur seeking capital."
    },
    {
      name: "Robert Anderson",
      business: "Prime Real Estate",
      amount: "$180.5K",
      gender: "male",
      initials: "RA",
      avatarId: "robert_anderson",
      testimonial: "Rami provided me with the financial tools needed to grow my real estate business. A true expert in his field."
    },
    {
      name: "Amanda Taylor",
      business: "Modern Dental Clinic",
      amount: "$110K",
      gender: "female",
      initials: "AT",
      avatarId: "amanda_taylor",
      testimonial: "Thanks to Rami, I was able to equip my dental clinic with the latest technology. His personalized approach makes the difference."
    },
    {
      name: "Christopher Brown",
      business: "FitLife Gym Network",
      amount: "$95K",
      gender: "male",
      initials: "CB",
      avatarId: "christopher_brown",
      testimonial: "Rami helped me secure funding to open my second gym. His experience in the financial sector is invaluable."
    }
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="inline-flex items-center bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              LIMITED TIME OFFER
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block sm:inline">Get Access To</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"> 0% Interest</span>
            <span className="block sm:inline"> Funding</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join hundreds of successful entrepreneurs who have secured millions in funding with our proven strategies
          </p>
          
          {/* Video Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 mb-8 max-w-4xl mx-auto border border-gray-600 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">AVOID</div>
              <h2 className="text-2xl font-bold text-red-400">4 METHODS</h2>
            </div>
            
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="AVOID 4 METHODS - Business Funding Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video Description */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Learn What NOT to Do</h3>
              <p className="text-gray-300 text-sm">
                Watch this video to discover the 4 funding methods you should avoid and why they can hurt your business.
              </p>
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
            <p className="text-gray-400 text-sm mt-2">Free consultation • No obligation • Quick approval process</p>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What Our Clients Are Saying About Us...
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Real testimonials from real clients who achieved their funding goals
          </p>
          
          {/* Testimonial Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 relative overflow-hidden">
                {/* Background Gradient Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-50 via-blue-100 to-transparent rounded-full -translate-y-12 translate-x-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-50 to-transparent rounded-full translate-y-8 -translate-x-8 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Amount Badge at Top */}
                <div className="flex justify-end mb-4 sm:mb-6 relative z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {testimonial.amount}
                  </div>
                </div>
                
                {/* Avatar and Info */}
                <div className="flex flex-col items-center text-center mb-3 sm:mb-6 relative z-10">
                  <div className="mb-2 sm:mb-3">
                    <AvatarComponent testimonial={testimonial} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-lg mb-1 group-hover:text-blue-600 transition-colors duration-300">{testimonial.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-2">{testimonial.business}</p>
                    <div className="flex items-center justify-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-2 sm:p-4 border-l-4 border-blue-500 group-hover:border-blue-600 transition-colors duration-300">
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </p>
                  </div>
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-blue-200 text-xl sm:text-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <svg className="w-4 h-4 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9.414 10l1.293 1.293a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2z" clipRule="evenodd"/>
                  </svg>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
