'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Logo and Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/favicon.png" 
                alt="Credit with Rami" 
                width={60}
                height={60}
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
              />
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md text-sm sm:text-base">
              Former US Business Banker specializing in business funding and credit building. 
              5+ years of expertise helping clients achieve exceptional credit scores and secure business financing.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://www.instagram.com/creditwithrami" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">@creditwithrami</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base">
About
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base">
Services
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base">
Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                <a 
                  href="https://www.instagram.com/creditwithrami" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base"
                >
                  @creditwithrami
                </a>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                <a 
                  href="mailto:info@creditwithrami.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base break-all"
                >
                  info@creditwithrami.com
                </a>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <a 
                  href="https://wa.me/17866204231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm sm:text-base"
                >
                  +1 (786) 620-4231
                </a>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base">2625 SE 13th St. Homestead, FL 33035</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Credit with Rami. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors duration-200">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors duration-200">
                  Terms
                </Link>
              </div>
              <span className="text-center sm:text-left">
                Made with ❤️ By Artica Group
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
