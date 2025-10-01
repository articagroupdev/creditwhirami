'use client'

// import Link from 'next/link'
import { CheckCircle, Clock, DollarSign, TrendingUp, Shield, Building2, CreditCard, Gift } from 'lucide-react'

const BusinessFinancing = () => {
  return (
    <section id="business-financing" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-300 rounded-full px-6 py-3 mb-6">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Specialized Business Financing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Are you a <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">good fit?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            If you meet the following requirements, we can get your business funded—fast, simple, and at 0% interest.
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">2+ Credit Cards</h3>
            <p className="text-gray-600 text-sm">At least two personal credit cards totaling $5,000 or more</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Established Business</h3>
            <p className="text-gray-600 text-sm">A corporation or LLC registered for 6+ months</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Strong Credit Score</h3>
            <p className="text-gray-600 text-sm">Personal credit score of 700 or higher</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clean History</h3>
            <p className="text-gray-600 text-sm">No late payments, collections, or bankruptcies</p>
          </div>
        </div>

        {/* Not 100% there yet message */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Not 100% there yet? Let’s get your profile fixed to get qualified.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          
          {/* Left Column - What We Offer */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">0% Interest Funding</h4>
                  <p className="text-gray-600">Access $50K-$150K in business capital with 0% interest for up to 12 months.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Travel Rewards</h4>
                  <p className="text-gray-600">Use credit card points from bonuses and spending to travel for free.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Fast Approvals</h4>
                  <p className="text-gray-600">Get pre-qualified quickly with a simple process—no endless paperwork.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Transparent Process</h4>
                  <p className="text-gray-600">No hidden fees, no gimmicks—just clear steps and real results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Business Credit Types */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Type of Business Credit Do You Get?</h3>
            <h4 className="text-xl font-semibold text-gray-700 mb-6">Business Credit Cards</h4>
            <p className="text-gray-600 mb-8">The smartest way to fund your business—here is why.</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h5 className="text-lg font-bold text-gray-900 mb-4">0% Interest Funding</h5>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Access to $50K-$150K in business capital</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">0% interest for up to 12 months</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Flexible payment options</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Rewards & Travel</h5>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Earn points on every dollar spent</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Welcome bonuses for free flights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Redeem for hotels and upgrades</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h5 className="text-lg font-bold text-gray-900 mb-4">Business Benefits</h5>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Build business credit history</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Separate business and personal expenses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 text-sm">Establish banking relationships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Simple and Efficient Process</h3>
          
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-3 gap-8 relative">
              
              {/* Background connecting lines */}
              <div className="absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 z-0"></div>
              
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Book a Call</h4>
                <p className="text-gray-600 leading-relaxed">
                  Answer a few quick questions and schedule a call to get started.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Qualify</h4>
                <p className="text-gray-600 leading-relaxed">
                  We&apos;ll analyze your credit and business profile, then either start the funding process or fix any issues holding you back.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Receive Funding</h4>
                <p className="text-gray-600 leading-relaxed">
                  Secure $50K-$150K in business credit within 1-3 weeks—fast and at 0% interest.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Timeline Layout */}
          <div className="md:hidden">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-green-300 to-purple-300"></div>
              
              {/* Step 1 */}
              <div className="relative flex items-start space-x-6 mb-12 animate-fade-in-up" style={{animationDelay: '0s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Book a Call</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Answer a few quick questions and schedule a call to get started.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start space-x-6 mb-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Qualify</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We&apos;ll analyze your credit and business profile, then either start the funding process or fix any issues holding you back.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start space-x-6 animate-fade-in-up" style={{animationDelay: '1s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Receive Funding</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Secure $50K-$150K in business credit within 1-3 weeks—fast and at 0% interest.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      
    </section>
  )
}

export default BusinessFinancing