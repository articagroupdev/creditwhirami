'use client'

import React, { useState } from 'react'
import { X, User, MessageSquare, CheckCircle } from 'lucide-react'

interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  businessName: string
  creditCards: string
  establishedBusiness: string
  strongCreditScore: string
  cleanHistory: string
  preferredDate: string
  preferredTime: string
  message: string
}

interface SubmissionData extends FormData {
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
    // Typeform questions
    creditCards: '', // Yes/No
    establishedBusiness: '', // Yes/No
    strongCreditScore: '', // Yes/No
    cleanHistory: '', // Yes/No
    // Additional info
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    // Validar paso actual antes de continuar
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.businessName) {
        alert('Please fill in all required fields')
        return
      }
    }
    
    if (currentStep === 2) {
      if (!formData.creditCards || !formData.establishedBusiness || !formData.strongCreditScore || !formData.cleanHistory) {
        alert('Please answer all eligibility questions')
        return
      }
    }
    
    if (currentStep === 3) {
      // Si no es elegible, ir directo al envío
      if (!determineEligibility()) {
        setCurrentStep(5) // Ir directo al paso de envío
        return
      }
    }
    
    if (currentStep === 4) {
      if (!formData.preferredDate || !formData.preferredTime) {
        alert('Please select your preferred date and time')
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
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      const result = await response.json()
      console.log('Application submitted successfully:', result)
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
      creditCards: '',
      establishedBusiness: '',
      strongCreditScore: '',
      cleanHistory: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    })
    setCurrentStep(1)
    setIsSubmitted(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Schedule Your Call</h2>
              <p className="text-gray-600">Let&apos;s get your business funded</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    step <= currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-3 h-3" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`w-8 h-1 mx-1 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Step {currentStep} of 5
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">
                {determineEligibility() 
                  ? `Thank you for your application! We&apos;ll contact you at ${formData.email} to confirm your call scheduled for ${formData.preferredDate} at ${formData.preferredTime}.`
                  : `Thank you for your application! We&apos;ll review your information and contact you within 24 hours at ${formData.email} to help you improve your profile and get qualified.`
                }
              </p>
              <button
                onClick={handleClose}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your business name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Typeform Questions */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-6">
                    <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Eligibility Questions</h3>
                    <p className="text-gray-600">Let&apos;s check if you qualify for funding</p>
                  </div>
                  
                  {/* Question 1 */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      2+ Credit Cards
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Do you have at least two personal credit cards totaling $5,000 or more?
                    </p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="creditCards"
                          value="Yes"
                          checked={formData.creditCards === 'Yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="creditCards"
                          value="No"
                          checked={formData.creditCards === 'No'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Established Business
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Do you have a corporation or LLC registered for 6+ months?
                    </p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="establishedBusiness"
                          value="Yes"
                          checked={formData.establishedBusiness === 'Yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="establishedBusiness"
                          value="No"
                          checked={formData.establishedBusiness === 'No'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Strong Credit Score
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Is your personal credit score 700 or higher?
                    </p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="strongCreditScore"
                          value="Yes"
                          checked={formData.strongCreditScore === 'Yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="strongCreditScore"
                          value="No"
                          checked={formData.strongCreditScore === 'No'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Clean History
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Do you have late payments, collections, or bankruptcies in the last two years?
                    </p>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cleanHistory"
                          value="Yes"
                          checked={formData.cleanHistory === 'Yes'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="cleanHistory"
                          value="No"
                          checked={formData.cleanHistory === 'No'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
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
                          <span className={`text-xl font-bold ${determineEligibility() ? 'text-green-800' : 'text-yellow-800'}`}>
                            {determineEligibility() ? '🎉 CONGRATULATIONS!' : '⚠️ NOT CURRENTLY ELIGIBLE'}
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
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Schedule Your Call</h3>
                    <p className="text-gray-600">Let&apos;s get you funded! Choose your preferred time</p>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">🎉 You&apos;re Eligible!</h4>
                      <p className="text-green-700">
                        You meet all the requirements for business funding. Let&apos;s schedule your consultation call to get you funded with $50K-$150K at 0% interest!
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                      </select>
                    </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us more about your funding needs or any questions you have..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">What to expect in your call:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Review of your business funding options</li>
                      <li>• Discussion of $50K-$150K funding at 0% interest</li>
                      <li>• Next steps to get your business funded</li>
                      <li>• Q&A about the funding process</li>
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
                          <span className={`font-semibold ${determineEligibility() ? 'text-green-800' : 'text-yellow-800'}`}>
                            {determineEligibility() ? '✅ Eligible for Funding' : '⚠️ Not Currently Eligible'}
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
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {currentStep === 3 && !determineEligibility() ? 'Continue' : 'Next'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
