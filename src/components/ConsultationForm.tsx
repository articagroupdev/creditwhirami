'use client'

import { useState, useEffect } from 'react'
import { X, Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, CreditCard, DollarSign, Star, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

interface ConsultationFormProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  fundingAmount: string
  creditScore: string
  monthlyRevenue: string
  timeInBusiness: string
  consultationType: string
  urgency: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const ConsultationForm = ({ isOpen, onClose }: ConsultationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    fundingAmount: '',
    creditScore: '',
    monthlyRevenue: '',
    timeInBusiness: '',
    consultationType: '',
    urgency: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentStep, setCurrentStep] = useState(1)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        fundingAmount: '',
        creditScore: '',
        monthlyRevenue: '',
        timeInBusiness: '',
        consultationType: '',
        urgency: '',
        message: ''
      })
      setErrors({})
      setSubmitStatus('idle')
      setCurrentStep(1)
    }
  }, [isOpen])

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email' : ''
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        return value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? 'Invalid phone format' : ''
      case 'businessName':
        return !value ? 'Business name is required' : value.trim().length < 2 ? 'Business name must be at least 2 characters' : ''
      case 'businessType':
        return !value ? 'Please select business type' : ''
      case 'fundingAmount':
        return !value ? 'Please select funding amount needed' : ''
      case 'creditScore':
        return value && (isNaN(Number(value)) || Number(value) < 300 || Number(value) > 850) ? 'Credit score must be between 300-850' : ''
      case 'monthlyRevenue':
        return value && (isNaN(Number(value)) || Number(value) < 0) ? 'Please enter a valid monthly revenue' : ''
      case 'timeInBusiness':
        return !value ? 'Please select time in business' : ''
      case 'consultationType':
        return !value ? 'Please select consultation type' : ''
      case 'urgency':
        return !value ? 'Please select urgency level' : ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateStep = (step: number): boolean => {
    const stepErrors: FormErrors = {}
    
    if (step === 1) {
      stepErrors.name = validateField('name', formData.name)
      stepErrors.email = validateField('email', formData.email)
      stepErrors.phone = validateField('phone', formData.phone)
    } else if (step === 2) {
      stepErrors.businessName = validateField('businessName', formData.businessName)
      stepErrors.businessType = validateField('businessType', formData.businessType)
      stepErrors.fundingAmount = validateField('fundingAmount', formData.fundingAmount)
    } else if (step === 3) {
      stepErrors.creditScore = validateField('creditScore', formData.creditScore)
      stepErrors.monthlyRevenue = validateField('monthlyRevenue', formData.monthlyRevenue)
      stepErrors.timeInBusiness = validateField('timeInBusiness', formData.timeInBusiness)
    } else if (step === 4) {
      stepErrors.consultationType = validateField('consultationType', formData.consultationType)
      stepErrors.urgency = validateField('urgency', formData.urgency)
    }
    
    setErrors(prev => ({ ...prev, ...stepErrors }))
    return !Object.values(stepErrors).some(error => error !== '')
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(1) || !validateStep(2)) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send consultation request')
      }

      await response.json()
      setSubmitStatus('success')
      
      // After 2 seconds, redirect to WhatsApp
      setTimeout(() => {
        const whatsappMessage = `Hello Rami! I'm ${formData.name} from ${formData.businessName}. I just completed the business funding consultation form on your website.
        
🏢 Business Information:
• Business: ${formData.businessName}
• Type: ${formData.businessType}
• Time in Business: ${formData.timeInBusiness}
• Funding Needed: ${formData.fundingAmount}
• Monthly Revenue: ${formData.monthlyRevenue || 'Not specified'}

💳 Credit Information:
• Credit Score: ${formData.creditScore || 'Not specified'}
• Consultation Type: ${formData.consultationType}
• Urgency: ${formData.urgency || 'Not specified'}

${formData.message ? `📝 Additional Details: ${formData.message}` : ''}

I'm interested in your business funding and credit building services. Please contact me to discuss my funding options.`

        const whatsappUrl = `https://wa.me/17868835543?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappUrl, '_blank')
        
        setTimeout(() => {
          onClose()
          setFormData({
            name: '', email: '', phone: '', businessName: '', businessType: '', 
            fundingAmount: '', creditScore: '', monthlyRevenue: '', timeInBusiness: '', 
            consultationType: '', urgency: '', message: ''
          })
          setSubmitStatus('idle')
          setCurrentStep(1)
        }, 1000)
      }, 2500)

    } catch (error) {
      console.error('Error sending consultation:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const renderStep1 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full px-6 py-3 mb-6 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-700">Step 1 of 4 - Personal Information</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Hello! Let&apos;s start with your details</h3>
        <p className="text-gray-600">We need to know a bit about you to provide the best business funding advice</p>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                errors.name 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
          </div>
          {errors.name && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.name}</span>
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                errors.email 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
              }`}
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.email}</span>
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                errors.phone 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
              }`}
              placeholder="(555) 123-4567"
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-6 py-3 mb-6 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-green-700">Step 2 of 4 - Business Information</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tell us about your business</h3>
        <p className="text-gray-600">This information helps us understand your funding needs</p>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-3">
            Business Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CreditCard className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              id="businessName"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                errors.businessName 
                  ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
              }`}
              placeholder="Your business name"
              disabled={isSubmitting}
            />
          </div>
          {errors.businessName && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.businessName}</span>
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="businessType" className="block text-sm font-semibold text-gray-700 mb-3">
            Business Type *
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-900 ${
              errors.businessType 
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select business type</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="S-Corp">S-Corp</option>
            <option value="Other">Other</option>
          </select>
          {errors.businessType && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.businessType}</span>
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="fundingAmount" className="block text-sm font-semibold text-gray-700 mb-3">
            Funding Amount Needed *
          </label>
          <select
            id="fundingAmount"
            name="fundingAmount"
            value={formData.fundingAmount}
            onChange={handleChange}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 text-gray-900 ${
              errors.fundingAmount 
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select funding amount</option>
            <option value="$5,000 - $25,000">$5,000 - $25,000</option>
            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="$100,000 - $250,000">$100,000 - $250,000</option>
            <option value="$250,000 - $500,000">$250,000 - $500,000</option>
            <option value="$500,000+">$500,000+</option>
          </select>
          {errors.fundingAmount && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.fundingAmount}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="creditScore" className="block text-sm font-semibold text-gray-700 mb-3">
              Credit Score (Approximate)
            </label>
            <select
              id="creditScore"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 hover:border-gray-300"
              disabled={isSubmitting}
            >
              <option value="">Not sure</option>
              <option value="Below 500">Below 500</option>
              <option value="500-579">500-579 (Poor)</option>
              <option value="580-669">580-669 (Fair)</option>
              <option value="670-739">670-739 (Good)</option>
              <option value="740-799">740-799 (Very Good)</option>
              <option value="800+">800+ (Excellent)</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="monthlyRevenue" className="block text-sm font-semibold text-gray-700 mb-3">
              Monthly Revenue
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
              <select
                id="monthlyRevenue"
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-gray-900 hover:border-gray-300"
                disabled={isSubmitting}
              >
                <option value="">Prefer not to say</option>
                <option value="Under $2,000">Under $2,000</option>
                <option value="$2,000 - $4,000">$2,000 - $4,000</option>
                <option value="$4,000 - $6,000">$4,000 - $6,000</option>
                <option value="$6,000 - $10,000">$6,000 - $10,000</option>
                <option value="Over $10,000">Over $10,000</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            How urgent is your situation?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'Not urgent', label: 'Not urgent', color: 'green', icon: '🟢' },
              { value: 'Moderately urgent', label: 'Moderately urgent', color: 'yellow', icon: '🟡' },
              { value: 'Very urgent', label: 'Very urgent', color: 'red', icon: '🔴' }
            ].map((option) => (
              <label
                key={option.value}
                className={`group relative flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.urgency === option.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <div className="text-2xl mb-2">{option.icon}</div>
                <span className={`text-sm font-medium text-center ${
                  formData.urgency === option.value ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
                {formData.urgency === option.value && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full px-6 py-3 mb-6 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-purple-700">Step 3 of 4 - Financial Information</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tell us about your financial situation</h3>
        <p className="text-gray-600">This information helps us assess your funding eligibility</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="creditScore" className="block text-sm font-semibold text-gray-700 mb-3">
              Credit Score (Approximate)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Star className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
              </div>
              <input
                type="number"
                id="creditScore"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  errors.creditScore 
                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                }`}
                placeholder="e.g., 650"
                min="300"
                max="850"
                disabled={isSubmitting}
              />
            </div>
            {errors.creditScore && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{errors.creditScore}</span>
              </div>
            )}
          </div>

          <div className="group">
            <label htmlFor="monthlyRevenue" className="block text-sm font-semibold text-gray-700 mb-3">
              Monthly Revenue
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
              </div>
              <input
                type="number"
                id="monthlyRevenue"
                name="monthlyRevenue"
                value={formData.monthlyRevenue}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  errors.monthlyRevenue 
                    ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
                }`}
                placeholder="e.g., 15000"
                min="0"
                disabled={isSubmitting}
              />
            </div>
            {errors.monthlyRevenue && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{errors.monthlyRevenue}</span>
              </div>
            )}
          </div>
        </div>

        <div className="group">
          <label htmlFor="timeInBusiness" className="block text-sm font-semibold text-gray-700 mb-3">
            Time in Business *
          </label>
          <select
            id="timeInBusiness"
            name="timeInBusiness"
            value={formData.timeInBusiness}
            onChange={handleChange}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-gray-900 ${
              errors.timeInBusiness 
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-purple-500'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select time in business</option>
            <option value="Less than 6 months">Less than 6 months</option>
            <option value="6 months - 1 year">6 months - 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          {errors.timeInBusiness && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.timeInBusiness}</span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-3 text-lg">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>You&apos;ll receive email confirmation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We&apos;ll redirect you to WhatsApp</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>A specialist will review your case</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We&apos;ll contact you within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full px-6 py-3 mb-6 shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-orange-700">Step 4 of 4 - Additional Details</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tell us more about your funding needs</h3>
        <p className="text-gray-600">The more details you provide, the better we can help you</p>
      </div>

      <div className="space-y-6">
        <div className="group">
          <label htmlFor="consultationType" className="block text-sm font-semibold text-gray-700 mb-3">
            Consultation Type *
          </label>
          <select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 text-gray-900 ${
              errors.consultationType 
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 hover:border-gray-300 focus:border-orange-500'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select consultation type</option>
            <option value="Business Funding">Business Funding</option>
            <option value="Credit Building">Credit Building</option>
            <option value="Both Services">Both Services</option>
            <option value="General Consultation">General Consultation</option>
          </select>
          {errors.consultationType && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{errors.consultationType}</span>
            </div>
          )}
        </div>

        <div className="group">
          <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-3">
            How urgent is your funding need? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: 'Immediate (Within 1 week)', label: 'Immediate', icon: '🚨' },
              { value: 'Urgent (Within 1 month)', label: 'Urgent', icon: '⚡' },
              { value: 'Moderate (1-3 months)', label: 'Moderate', icon: '📅' },
              { value: 'Flexible (3+ months)', label: 'Flexible', icon: '🕐' }
            ].map((option) => (
              <label
                key={option.value}
                className={`group relative flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.urgency === option.value
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  className="sr-only"
                  disabled={isSubmitting}
                />
                <div className="text-2xl mb-2">{option.icon}</div>
                <span className={`text-sm font-medium text-center ${
                  formData.urgency === option.value ? 'text-orange-700' : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
                {formData.urgency === option.value && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="group">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
            Additional Details (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 hover:border-gray-300"
            placeholder="Tell us more about your business goals, specific funding needs, or any questions you have..."
            disabled={isSubmitting}
          />
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-orange-900 mb-3 text-lg">What happens next?</h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>You&apos;ll receive email confirmation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We&apos;ll redirect you to WhatsApp</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Rami will review your business case</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>We&apos;ll contact you within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-3xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 px-8 py-6 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                  <h3 className="text-3xl font-bold text-white">
                    Free Consultation
                  </h3>
                </div>
                <p className="text-blue-100 text-lg">
                  Start your financial transformation today
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-blue-100 mb-3">
                <span className="font-medium">Progress</span>
                <span className="font-bold">{Math.round((currentStep / 4) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-400/30 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-blue-200">
                <span>Personal</span>
                <span>Business</span>
                <span>Financial</span>
                <span>Details</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="relative mb-8">
                  <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
                  <div className="absolute inset-0 w-24 h-24 bg-green-500/20 rounded-full mx-auto animate-ping"></div>
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-4">
                  Form submitted successfully!
                </h4>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg max-w-md mx-auto">
                  Your consultation has been sent to our team. You will be redirected to WhatsApp shortly to continue the personalized conversation.
                </p>
                <div className="inline-flex items-center space-x-3 text-green-600 bg-green-50 px-6 py-3 rounded-full border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Redirecting to WhatsApp...</span>
                </div>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="text-center py-12">
                <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-8" />
                <h4 className="text-3xl font-bold text-gray-900 mb-4">
                  Error sending form
                </h4>
                <p className="text-gray-600 mb-8 text-lg">
                  There was a problem sending your consultation. Please try again or contact us directly via WhatsApp.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Try again
                  </button>
                  <a
                    href="https://wa.me/17868835543"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
                  >
                    Go to WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}

                {/* Navigation buttons */}
                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="flex items-center space-x-2 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Previous</span>
                      </button>
                    )}
                  </div>
                  
                  <div>
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-2xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        disabled={isSubmitting}
                      >
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Consultation</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationForm