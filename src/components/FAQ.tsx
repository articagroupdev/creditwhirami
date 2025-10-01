'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What exactly do you offer?',
      answer: 'We provide consulting services that guide you through the process of preparing your credit and business profile to qualify for 0% interest business funding. This includes leveraging my experience in securing business credit, along with the proven strategies I\'ve used to successfully fund my own company and support other business owners nationwide.'
    },
    {
      question: 'How much funding can I qualify for?',
      answer: 'Most clients qualify for $50K–$150K in business credit at 0% interest for up to 12 months. The exact amount depends on your credit profile, business history, and overall financial picture.'
    },
    {
      question: 'Will applying hurt my personal credit?',
      answer: 'The process does involve hard inquiries, but these are minimal compared to the value of the funding you\'ll receive. Once approved, the accounts report to your business credit, keeping your personal utilization low.'
    },
    {
      question: 'Do I need business revenue to qualify?',
      answer: 'No. Unlike traditional loans, this funding does not require you to show business revenue. Instead, approval is based on your personal credit strength and business setup.'
    },
    {
      question: 'How long does the process take?',
      answer: 'Once qualified, you can expect to secure your funding in as little as 1–3 weeks.'
    },
    {
      question: 'What are the service fees?',
      answer: 'Our service fee is a fixed price, which depends on how much funding you\'re able to secure. Because every profile is different, fees are tailored to reflect the level of funding obtained.'
    },
    {
      question: 'What type of credit will I receive?',
      answer: 'We help you access business credit cards that come with: 0% interest for up to 12 months, flexible repayment options, reward points and travel benefits, and the ability to separate business and personal expenses.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            We answer the most common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have more questions?
          </p>
          <Link 
            href="/application"
            className="btn-primary"
          >
            Contact Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQ
