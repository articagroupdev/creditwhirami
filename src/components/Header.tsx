'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20 md:h-24 lg:h-24">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                {/* Logo para fondo transparente/oscuro */}
                <Image 
                  src="/cwr-logo-1.png" 
                  alt="Credit with Rami" 
                  width={280}
                  height={140}
                  className={`h-14 md:h-16 lg:h-16 w-auto group-hover:scale-105 transition-all duration-300 ${
                    isScrolled ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                />
                
                {/* Logo para fondo blanco */}
                <Image 
                  src="/cwr-logo-2.png" 
                  alt="Credit with Rami" 
                  width={280}
                  height={140}
                  className={`absolute top-0 left-0 h-14 md:h-16 lg:h-16 w-auto group-hover:scale-105 transition-all duration-300 ${
                    isScrolled ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop & Tablet Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-6">
            <ul className="flex items-center space-x-4 lg:space-x-6">
              <li>
                <Link 
                  href="#about" 
                  className={`font-medium transition-colors duration-200 hover:text-cyan-600 ${
                    isScrolled ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  Funding
                </Link>
              </li>
              
              <li>
                <Link 
                  href="#faq" 
                  className={`font-medium transition-colors duration-200 hover:text-cyan-600 ${
                    isScrolled ? 'text-gray-700' : 'text-gray-200'
                  }`}
                >
                  FAQ
                </Link>
              </li>
            </ul>
            
            {/* Contact Info */}
            <div className="flex items-center space-x-3 lg:space-x-4 border-l border-gray-300 pl-4 lg:pl-6">
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                {/* Email */}
                <a 
                  href="mailto:info@creditwithrami.com"
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                >
                  <Mail className={`w-4 h-4 ${isScrolled ? 'text-blue-600' : 'text-cyan-400'}`} />
                  <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-200'} hover:text-cyan-500 transition-colors duration-200`}>
                    info@creditwithrami.com
                  </span>
                </a>
                
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/17866204231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
                >
                  <Phone className={`w-4 h-4 ${isScrolled ? 'text-blue-600' : 'text-cyan-400'}`} />
                  <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-200'} hover:text-cyan-500 transition-colors duration-200`}>
                    +1 (786) 620-4231
                  </span>
                </a>
              </div>
              
              {/* CTA Button */}
              <Link 
                href="/application"
                className="hidden lg:inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-sm"
              >
                <span className="hidden xl:inline">Get your Business Funded</span>
                <span className="inline xl:hidden">Get Funded</span>
              </Link>
            </div>
          </div>
          
          {/* Tablet Contact - Visible on tablets only */}
          <div className="hidden md:flex xl:hidden items-center space-x-2 lg:space-x-3">
            <a 
              href="mailto:info@creditwithrami.com"
              className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 rounded-lg transition-all duration-200 ${
                isScrolled || isMenuOpen
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-gray-200 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs lg:text-sm font-medium hidden lg:inline">Email</span>
            </a>
            <a 
              href="https://wa.me/17866204231"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 rounded-lg transition-all duration-200 ${
                isScrolled || isMenuOpen
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-gray-200 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-xs lg:text-sm font-medium hidden lg:inline">Call</span>
            </a>
            <Link 
              href="/application"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-xs lg:text-sm"
            >
              <span className="hidden lg:inline">Get Funded</span>
              <span className="lg:hidden">Funded</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Quick Contact for Mobile */}
            <a 
              href="https://wa.me/17866204231"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled || isMenuOpen ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-cyan-400'
              }`}
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            
            {/* Email for Mobile */}
            <a 
              href="mailto:info@creditwithrami.com"
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled || isMenuOpen ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-cyan-400'
              }`}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            <button 
              onClick={toggleMenu}
              className={`p-2 transition-colors duration-200 ${
                isScrolled || isMenuOpen ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-cyan-400'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 z-50">
            <div className="px-4 py-4 max-h-[85vh] overflow-y-auto">
              
              {/* Mobile Navigation */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3 text-base flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Navigation
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <Link 
                    href="#about" 
                    className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Funding
                  </Link>
                  <Link 
                    href="#faq" 
                    className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    FAQ
                  </Link>
                  <Link 
                    href="#contact" 
                    className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-bold text-gray-900 mb-3 text-base flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Contact
                </h3>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {/* Email Mobile */}
                  <a 
                    href="mailto:info@creditwithrami.com"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Email</div>
                      <div className="text-xs text-blue-600">info@creditwithrami.com</div>
                    </div>
                  </a>
                  
                  {/* WhatsApp Mobile */}
                  <a 
                    href="https://wa.me/17866204231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-xs text-green-600">+1 (786) 620-4231</div>
                    </div>
                  </a>
                </div>
                
                {/* CTA Button */}
                <Link 
                  href="/application"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get your Business Funded
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </header>
  )
}

export default Header
