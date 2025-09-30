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
        <nav className="flex items-center justify-between h-20 md:h-24 lg:h-28">
          
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
                  className={`h-14 md:h-16 lg:h-20 w-auto group-hover:scale-105 transition-all duration-300 ${
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
                  className={`absolute top-0 left-0 h-14 md:h-16 lg:h-20 w-auto group-hover:scale-105 transition-all duration-300 ${
                    isScrolled ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop & Tablet Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex items-center space-x-4 lg:space-x-8">
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
            <div className="flex items-center space-x-3 lg:space-x-4 border-l border-gray-300 pl-4 lg:pl-8">
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
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-4 lg:px-6 py-2 lg:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base inline-block"
              >
                <span className="hidden lg:inline">Get your Business Funded</span>
                <span className="lg:hidden">Get Funded</span>
              </Link>
            </div>
          </div>
          
          {/* Tablet Contact - Hidden on Mobile and Desktop */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <a 
              href="https://wa.me/17866204231"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isScrolled || isMenuOpen
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-gray-200 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call</span>
            </a>
            <Link 
              href="/application"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md text-sm"
            >
              Get Funded
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
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

        {/* Enhanced Mobile & Tablet Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 z-50">
            <div className="px-4 py-6 max-h-[80vh] overflow-y-auto">
              

              {/* Mobile Navigation */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <Link 
                    href="#about" 
                    className="flex items-center justify-center p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Funding
                  </Link>
                  <Link 
                    href="#faq" 
                    className="flex items-center justify-center p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link 
                    href="#contact" 
                    className="flex items-center justify-center p-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium rounded-lg border border-gray-100 hover:border-blue-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  Get In Touch
                </h3>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {/* Email Mobile */}
                  <a 
                    href="mailto:info@creditwithrami.com"
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Email</div>
                      <div className="text-sm text-blue-600">info@creditwithrami.com</div>
                    </div>
                  </a>
                  
                  {/* WhatsApp Mobile */}
                  <a 
                    href="https://wa.me/17866204231"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-sm text-green-600">+1 (786) 620-4231</div>
                    </div>
                  </a>
                  
                  {/* Instagram Mobile */}
                  <a 
                    href="https://www.instagram.com/creditwithrami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.543c0-1.446.84-2.518 1.888-2.518.89 0 1.321.664 1.321 1.46 0 .896-.219 2.237-.332 3.482-.094.789.396 1.434 1.175 1.434 1.409 0 2.49-1.487 2.49-3.630 0-1.899-1.365-3.228-3.321-3.228-2.261 0-3.593 1.698-3.593 3.456 0 .685.263 1.419.592 1.818.065.078.074.147.055.228-.061.252-.196.796-.223.907-.035.146-.116.177-.268.107-1.001-.465-1.624-1.926-1.624-3.101 0-2.523 1.834-4.84 5.287-4.84 2.781 0 4.943 1.982 4.943 4.628 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A12.013 12.013 0 0012.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Instagram</div>
                      <div className="text-sm text-purple-600">@creditwithrami</div>
                    </div>
                  </a>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4 border border-blue-200">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Available Now</span>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Response within 24 hours guaranteed</p>
                </div>
                
                <Link 
                  href="/application"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10">Get your Business Funded</span>
                </Link>
                
                {/* Quick Stats for Mobile */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Why Choose Us</h4>
                  <div className="grid grid-cols-3 gap-3 text-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-lg font-bold text-blue-600">10+</div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-lg font-bold text-green-600">2,500+</div>
                      <div className="text-xs text-gray-600">Clients</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-lg font-bold text-purple-600">98%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                  </div>
                  
                  {/* Benefits List */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span>Free consultation with no obligation</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span>Results typically within 30-60 days</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span>100% satisfaction guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </header>
  )
}

export default Header
