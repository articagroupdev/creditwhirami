'use client'

import React, { useState, useEffect } from 'react'
import { X, User, MessageSquare, CheckCircle, Calendar, Clock, AlertCircle, Star, Phone, Rocket } from 'lucide-react'

interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  monthlyRevenue: string
  creditCards: string
  establishedBusiness: string
  strongCreditScore: string
  cleanHistory: string
  preferredDate: string
  preferredTime: string
  timezone: string
  message: string
  urgency: string
  fundingAmount: string
}

interface SubmissionData {
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  monthlyRevenue: string
  creditCards: string
  establishedBusiness: string
  strongCreditScore: string
  cleanHistory: string
  preferredDate: string
  preferredTime: string
  timezone: string
  message: string
  urgency: string
  fundingAmount: string
  isEligible: boolean
  eligibilityReason: string
  timestamp: string
}

const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    monthlyRevenue: '',
    // Typeform questions
    creditCards: '', // Yes/No
    establishedBusiness: '', // Yes/No
    strongCreditScore: '', // Yes/No
    cleanHistory: '', // Yes/No
    // Additional info
    preferredDate: '',
    preferredTime: '',
    timezone: 'EST',
    message: '',
    urgency: '',
    fundingAmount: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9
    const endHour = 17
    
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = hour === 12 ? '12:00 PM' : 
                   hour > 12 ? `${hour - 12}:00 PM` : 
                   `${hour}:00 AM`
      slots.push(time)
    }
    
    setAvailableTimeSlots(slots)
  }

  useEffect(() => {
    if (isOpen) {
      generateTimeSlots()
    }
  }, [isOpen])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone) && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Invalid phone format'
        }
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
        if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required'
        if (!formData.monthlyRevenue.trim()) newErrors.monthlyRevenue = 'Monthly revenue is required'
        break
        
      case 2:
        if (!formData.creditCards) newErrors.creditCards = 'Please answer this question'
        if (!formData.establishedBusiness) newErrors.establishedBusiness = 'Please answer this question'
        if (!formData.strongCreditScore) newErrors.strongCreditScore = 'Please answer this question'
        if (!formData.cleanHistory) newErrors.cleanHistory = 'Please answer this question'
        break
        
      case 4:
        if (determineEligibility()) {
          if (!formData.preferredDate) newErrors.preferredDate = 'Please select a date'
          if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time'
          if (!formData.fundingAmount) newErrors.fundingAmount = 'Please select funding amount'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      return
    }
    
    if (currentStep === 3) {
      // If not eligible, go directly to submission
      if (!determineEligibility()) {
        setCurrentStep(5) // Go directly to submission step
        return
      }
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      // Si estamos en el paso 5 (envío) y no es elegible, volver al paso 3
      if (currentStep === 5 && !determineEligibility()) {
        setCurrentStep(3)
        return
      }
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Determinar elegibilidad
      const isEligible = determineEligibility()
      
      // Preparar datos para envío
      const submissionData = {
        ...formData,
        isEligible,
        eligibilityReason: getEligibilityReason(),
        timestamp: new Date().toISOString()
      }
      
      // Enviar por email
      await sendToEmail(submissionData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const determineEligibility = () => {
    // Si responden No de la 1ra a la 3era pregunta = no elegible
    if (formData.creditCards === 'No' || 
        formData.establishedBusiness === 'No' || 
        formData.strongCreditScore === 'No') {
      return false
    }
    
    // Si responden Si en la 4ta = no elegible
    if (formData.cleanHistory === 'Yes') {
      return false
    }
    
    return true
  }

  const getEligibilityReason = () => {
    if (formData.creditCards === 'No') return 'Less than 2 credit cards totaling $5,000+'
    if (formData.establishedBusiness === 'No') return 'Business not established for 6+ months'
    if (formData.strongCreditScore === 'No') return 'Credit score below 700'
    if (formData.cleanHistory === 'Yes') return 'Has late payments, collections, or bankruptcies'
    return 'Eligible'
  }

  const sendToEmail = async (data: SubmissionData) => {
    try {
      console.log('Sending appointment data:', data)
      
      // Save to database
      const appointmentResponse = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Appointment response status:', appointmentResponse.status)

      if (!appointmentResponse.ok) {
        const errorText = await appointmentResponse.text()
        console.error('Appointment save failed:', errorText)
        throw new Error(`Failed to save appointment: ${errorText}`)
      }

      const appointmentResult = await appointmentResponse.json()
      console.log('Appointment saved successfully:', appointmentResult)

      // Also send email notification (if you have email service)
      try {
        const emailResponse = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!emailResponse.ok) {
          console.warn('Failed to send email notification, but appointment was saved')
        } else {
          const emailResult = await emailResponse.json()
          console.log('Email notification sent:', emailResult)
        }
      } catch (emailError) {
        console.warn('Email service error (appointment still saved):', emailError)
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      throw error
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      monthlyRevenue: '',
      creditCards: '',
      establishedBusiness: '',
      strongCreditScore: '',
      cleanHistory: '',
      preferredDate: '',
      preferredTime: '',
      timezone: 'EST',
      message: '',
      urgency: '',
      fundingAmount: ''
    })
    setCurrentStep(1)
    setIsSubmitted(false)
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 flex items-center">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="truncate">Get Funded Today</span>
              </h2>
              <p className="text-blue-100 text-sm sm:text-lg">Let&apos;s secure your business funding</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 sm:p-3 hover:bg-blue-500 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-center space-x-1 sm:space-x-3">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ${
                    step <= currentStep 
                      ? 'bg-white text-blue-600 shadow-lg transform scale-110' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`w-6 sm:w-12 h-1 sm:h-2 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${
                      step < currentStep ? 'bg-white' : 'bg-blue-500'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 sm:mt-4 text-center">
              <span className="bg-white bg-opacity-20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Step {currentStep} of 5
              </span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 mr-3 text-green-500" />
                Application Submitted!
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-200">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {determineEligibility() 
                    ? `Thank you for your application! We'll contact you at ${formData.email} to confirm your call scheduled for ${formData.preferredDate} at ${formData.preferredTime}.`
                    : `Thank you for your application! We'll review your information and contact you within 24 hours at ${formData.email} to help you improve your profile and get qualified.`
                  }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-600 text-base sm:text-lg">Tell us about yourself and your business</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white placeholder-gray-400 text-blue-900 ${
                            errors.name 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.name 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {formData.name && !errors.name && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.name && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white placeholder-gray-400 text-blue-900 ${
                            errors.email 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                          placeholder="Enter your email"
                        />
                        {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white placeholder-gray-400 text-blue-900 ${
                            errors.phone 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.phone && (/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone) || /^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        {formData.phone && !errors.phone && (/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phone) || /^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.phone && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Business Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg bg-white placeholder-gray-400 text-blue-900 ${
                            errors.businessName 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.businessName 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                          placeholder="Your business name"
                        />
                        {formData.businessName && !errors.businessName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.businessName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.businessName}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Business Type *
                      </label>
                      <div className="relative">
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white appearance-none cursor-pointer text-blue-900 ${
                            errors.businessType 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.businessType 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                        >
                          <option value="" className="text-blue-900">Select business type</option>
                          <option value="Restaurant" className="text-blue-900">Restaurant</option>
                          <option value="Retail" className="text-blue-900">Retail</option>
                          <option value="Construction" className="text-blue-900">Construction</option>
                          <option value="Technology" className="text-blue-900">Technology</option>
                          <option value="Healthcare" className="text-blue-900">Healthcare</option>
                          <option value="Professional Services" className="text-blue-900">Professional Services</option>
                          <option value="Manufacturing" className="text-blue-900">Manufacturing</option>
                          <option value="Transportation" className="text-blue-900">Transportation</option>
                          <option value="Real Estate" className="text-blue-900">Real Estate</option>
                          <option value="Other" className="text-blue-900">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {formData.businessType && !errors.businessType && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.businessType && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.businessType && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.businessType}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-blue-600">
                        Monthly Revenue *
                      </label>
                      <div className="relative">
                        <select
                          name="monthlyRevenue"
                          value={formData.monthlyRevenue}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white appearance-none cursor-pointer text-blue-900 ${
                            errors.monthlyRevenue 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.monthlyRevenue 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                        >
                          <option value="" className="text-blue-900">Select monthly revenue</option>
                          <option value="Under $5,000" className="text-blue-900">Under $5,000</option>
                          <option value="$5,000 - $10,000" className="text-blue-900">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000" className="text-blue-900">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000" className="text-blue-900">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000" className="text-blue-900">$50,000 - $100,000</option>
                          <option value="Over $100,000" className="text-blue-900">Over $100,000</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {formData.monthlyRevenue && !errors.monthlyRevenue && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.monthlyRevenue && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.monthlyRevenue && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.monthlyRevenue}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Typeform Questions */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Eligibility Questions</h3>
                    <p className="text-gray-600 text-lg">Let&apos;s check if you qualify for funding</p>
                  </div>
                  
                  {/* Question 1 */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      2+ Credit Cards
                    </h4>
                    <p className="text-gray-700 mb-6 text-lg">
                      Do you have at least two personal credit cards totaling $5,000 or more?
                    </p>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="creditCards"
                          value="Yes"
                          checked={formData.creditCards === 'Yes'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-blue-600 transition-colors">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="creditCards"
                          value="No"
                          checked={formData.creditCards === 'No'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-blue-600 transition-colors">No</span>
                      </label>
                    </div>
                    {errors.creditCards && <p className="text-red-500 text-sm mt-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.creditCards}
                    </p>}
                  </div>

                  {/* Question 2 */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      Established Business
                    </h4>
                    <p className="text-gray-700 mb-6 text-lg">
                      Do you have a corporation or LLC registered for 6+ months?
                    </p>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="establishedBusiness"
                          value="Yes"
                          checked={formData.establishedBusiness === 'Yes'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-green-600 transition-colors">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="establishedBusiness"
                          value="No"
                          checked={formData.establishedBusiness === 'No'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-green-600 transition-colors">No</span>
                      </label>
                    </div>
                    {errors.establishedBusiness && <p className="text-red-500 text-sm mt-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.establishedBusiness}
                    </p>}
                  </div>

                  {/* Question 3 */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      Strong Credit Score
                    </h4>
                    <p className="text-gray-700 mb-6 text-lg">
                      Is your personal credit score 700 or higher?
                    </p>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="strongCreditScore"
                          value="Yes"
                          checked={formData.strongCreditScore === 'Yes'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-purple-600 transition-colors">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="strongCreditScore"
                          value="No"
                          checked={formData.strongCreditScore === 'No'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-purple-600 transition-colors">No</span>
                      </label>
                    </div>
                    {errors.strongCreditScore && <p className="text-red-500 text-sm mt-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.strongCreditScore}
                    </p>}
                  </div>

                  {/* Question 4 */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                      Clean History
                    </h4>
                    <p className="text-gray-700 mb-6 text-lg">
                      Do you have late payments, collections, or bankruptcies in the last two years?
                    </p>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="cleanHistory"
                          value="Yes"
                          checked={formData.cleanHistory === 'Yes'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-orange-600 transition-colors">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="cleanHistory"
                          value="No"
                          checked={formData.cleanHistory === 'No'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg font-medium group-hover:text-orange-600 transition-colors">No</span>
                      </label>
                    </div>
                    {errors.cleanHistory && <p className="text-red-500 text-sm mt-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.cleanHistory}
                    </p>}
                  </div>
                </div>
              )}

              {/* Step 3: Eligibility Assessment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Eligibility Assessment</h3>
                    <p className="text-gray-600">Let&apos;s see if you qualify for funding</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Business:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.businessName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Eligibility Questions */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Your Answers</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">2+ Credit Cards ($5,000+):</span>
                          <span className={`font-medium ${formData.creditCards === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                            {formData.creditCards}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Established Business (6+ months):</span>
                          <span className={`font-medium ${formData.establishedBusiness === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                            {formData.establishedBusiness}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Credit Score 700+:</span>
                          <span className={`font-medium ${formData.strongCreditScore === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                            {formData.strongCreditScore}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Clean History (No issues):</span>
                          <span className={`font-medium ${formData.cleanHistory === 'No' ? 'text-green-600' : 'text-red-600'}`}>
                            {formData.cleanHistory === 'Yes' ? 'Has Issues' : 'Clean'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Eligibility Status */}
                    <div className={`p-6 rounded-lg ${determineEligibility() ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <CheckCircle className={`w-8 h-8 mr-2 ${determineEligibility() ? 'text-green-500' : 'text-yellow-500'}`} />
                          <span className={`text-xl font-bold flex items-center justify-center ${determineEligibility() ? 'text-green-800' : 'text-yellow-800'}`}>
                            {determineEligibility() ? (
                              <>
                                <CheckCircle className="w-6 h-6 mr-2" />
                                CONGRATULATIONS!
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-6 h-6 mr-2" />
                                NOT CURRENTLY ELIGIBLE
                              </>
                            )}
                          </span>
                        </div>
                        <p className={`text-lg font-semibold mb-2 ${determineEligibility() ? 'text-green-700' : 'text-yellow-700'}`}>
                          {determineEligibility() ? 'You qualify for business funding!' : 'We can still help you!'}
                        </p>
                        <p className={`text-sm ${determineEligibility() ? 'text-green-600' : 'text-yellow-600'}`}>
                          {determineEligibility() 
                            ? 'You meet all the requirements. Let&apos;s schedule your consultation call to get you funded!'
                            : `Reason: ${getEligibilityReason()}. We&apos;ll help you improve your profile and get qualified.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Schedule Call (Only for Eligible Users) */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Calendar className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Schedule Your Call</h3>
                    <p className="text-gray-600">Let&apos;s get you funded! Choose your preferred time</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-3">
                        <Star className="w-6 h-6 text-yellow-500 mr-2" />
                        <h4 className="text-lg font-semibold text-green-800 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          You&apos;re Eligible!
                        </h4>
                      </div>
                      <p className="text-green-700">
                        You meet all the requirements for business funding. Let&apos;s schedule your consultation call to get you funded with $50K-$150K at 0% interest!
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-green-600">
                        <Calendar className="w-5 h-5 inline mr-2" />
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                          className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 text-lg bg-white text-blue-900 cursor-pointer ${
                            errors.preferredDate 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.preferredDate 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                        />
                        {formData.preferredDate && !errors.preferredDate && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.preferredDate && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.preferredDate}
                        </p>
                      )}
                      {formData.preferredDate && !errors.preferredDate && (
                        <p className="text-green-600 text-sm mt-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Date selected: {new Date(formData.preferredDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="block text-sm font-semibold text-gray-800 mb-3 transition-colors duration-300 group-focus-within:text-green-600">
                        <Clock className="w-5 h-5 inline mr-2" />
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 text-lg bg-white appearance-none cursor-pointer text-blue-900 ${
                            errors.preferredTime 
                              ? 'border-red-400 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : formData.preferredTime 
                                ? 'border-green-400 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300 focus:shadow-lg'
                          }`}
                        >
                          <option value="" className="text-blue-900">Select time</option>
                          {availableTimeSlots.map((time) => (
                            <option key={time} value={time} className="text-blue-900">{time}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {formData.preferredTime && !errors.preferredTime && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                          </div>
                        )}
                        {errors.preferredTime && (
                          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500 animate-bounce" />
                          </div>
                        )}
                      </div>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.preferredTime}
                        </p>
                      )}
                      {formData.preferredTime && !errors.preferredTime && (
                        <p className="text-green-600 text-sm mt-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Time selected: {formData.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-blue-900"
                      >
                        <option value="EST" className="text-blue-900">Eastern Time (EST)</option>
                        <option value="CST" className="text-blue-900">Central Time (CST)</option>
                        <option value="MST" className="text-blue-900">Mountain Time (MST)</option>
                        <option value="PST" className="text-blue-900">Pacific Time (PST)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Amount Needed *
                      </label>
                      <select
                        name="fundingAmount"
                        value={formData.fundingAmount}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-blue-900 ${
                          errors.fundingAmount ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="" className="text-blue-900">Select amount</option>
                        <option value="$50,000 - $75,000" className="text-blue-900">$50,000 - $75,000</option>
                        <option value="$75,000 - $100,000" className="text-blue-900">$75,000 - $100,000</option>
                        <option value="$100,000 - $125,000" className="text-blue-900">$100,000 - $125,000</option>
                        <option value="$125,000 - $150,000" className="text-blue-900">$125,000 - $150,000</option>
                        <option value="Over $150,000" className="text-blue-900">Over $150,000</option>
                      </select>
                      {errors.fundingAmount && <p className="text-red-500 text-sm mt-1">{errors.fundingAmount}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-blue-900"
                    >
                      <option value="" className="text-blue-900">Select urgency</option>
                      <option value="ASAP - Within 1 week" className="text-blue-900">ASAP - Within 1 week</option>
                      <option value="Soon - Within 2-4 weeks" className="text-blue-900">Soon - Within 2-4 weeks</option>
                      <option value="Flexible - Within 1-2 months" className="text-blue-900">Flexible - Within 1-2 months</option>
                      <option value="Planning ahead - 2+ months" className="text-blue-900">Planning ahead - 2+ months</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-blue-900 placeholder-gray-400"
                      placeholder="Tell us more about your funding needs, business goals, or any questions you have..."
                    />
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      What to expect in your call:
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Review of your business funding options and eligibility
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Discussion of $50K-$150K funding at 0% interest rates
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Next steps to get your business funded quickly
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        Q&A about the funding process and timeline
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 5: Final Review and Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Review and Submit</h3>
                    <p className="text-gray-600">Please review your information before submitting</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Business:</span>
                          <span className="ml-2 font-medium text-gray-900">{formData.businessName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Eligibility Status */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Eligibility Status</h4>
                      <div className={`p-4 rounded-lg ${determineEligibility() ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <div className="flex items-center">
                          <CheckCircle className={`w-5 h-5 mr-2 ${determineEligibility() ? 'text-green-500' : 'text-yellow-500'}`} />
                          <span className={`font-semibold flex items-center ${determineEligibility() ? 'text-green-800' : 'text-yellow-800'}`}>
                            {determineEligibility() ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Eligible for Funding
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Not Currently Eligible
                              </>
                            )}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${determineEligibility() ? 'text-green-700' : 'text-yellow-700'}`}>
                          {determineEligibility() 
                            ? 'You meet all requirements for business funding.'
                            : `Reason: ${getEligibilityReason()}. We&apos;ll help you improve your profile.`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Call Schedule (Only if eligible) */}
                    {determineEligibility() && formData.preferredDate && formData.preferredTime && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Scheduled Call</h4>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-center mb-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="font-semibold text-green-800">Call Scheduled</span>
                          </div>
                          <p className="text-green-700 text-center">
                            {formData.preferredDate} at {formData.preferredTime}
                          </p>
                          {formData.message && (
                            <p className="text-sm text-green-600 mt-2 text-center">
                              Message: {formData.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md'
                  }`}
                >
                  ← Previous
                </button>
                
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {currentStep === 3 && !determineEligibility() ? 'Continue →' : 'Next →'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScheduleCallModal
