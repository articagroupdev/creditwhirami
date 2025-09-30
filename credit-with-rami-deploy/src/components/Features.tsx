'use client'

import { CheckCircle, DollarSign, Gift, Heart, Award } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Get Funded',
      description: 'Access capital at 0% interest without the usual roadblocks',
      benefits: ['$50K-$150K in business capital', '0% interest for up to 12 months', 'No complicated paperwork']
    },
    {
      icon: Gift,
      title: 'Earn While You Spend',
      description: 'Use credit card points from bonuses and spending to travel for free',
      benefits: ['Welcome bonuses for free flights', 'Points on every dollar spent', 'Redeem for hotels and upgrades']
    },
    {
      icon: Heart,
      title: 'What We Stand For',
      description: 'Transparency, clarity, and results you can trust',
      benefits: ['No hidden fees or gimmicks', 'Clear steps and real results', '100% satisfaction guarantee']
    }
  ]


  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            COMPREHENSIVE SOLUTIONS
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Financial Solutions
            <span className="block gradient-text">for Your Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With over 10 years of experience, we offer specialized financial services that have transformed 
            the lives of thousands of people and businesses nationwide.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Feature Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>

              {/* Benefits List */}
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features