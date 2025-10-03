'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import ScheduleCallModal from './ScheduleCallModal'

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ready to <span className="gradient-text">get your business funded</span> and build exceptional credit?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with Rami, former US Business Banker, for your complimentary consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instagram</h4>
                    <p className="text-gray-600">@creditwithrami</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@creditwithrami.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Number Phone</h4>
                    <p className="text-gray-600">+1 (786) 620-4231</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">2625 SE 13th St. Homestead, FL 33035</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Get your Business Funded
            </h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Get started with a personalized consultation tailored to your business funding and credit building needs.
                </p>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full btn-primary text-lg py-4"
                >
                  Start Free Consultation
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mt-6">
                <h4 className="font-bold text-gray-900 mb-3">
                  Why Rami stands apart:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Former US Business Banker
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    5+ years credit building expertise
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Personal 780+ credit score
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Specialized in business funding
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Free initial consultation
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <ScheduleCallModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}

export default Contact
