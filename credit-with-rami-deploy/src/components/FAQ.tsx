'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How long does it take to see results in my credit score?',
      answer: 'While results vary based on individual circumstances, most clients experience significant improvements within 30-60 days. Our average client sees a remarkable 150-point increase within just 90 days.'
    },
    {
      question: 'What does the credit repair service include?',
      answer: 'Our comprehensive service includes a thorough credit report analysis, identification and removal of negative items, strategic disputes with credit bureaus, personalized score improvement strategies, and ongoing monitoring until you achieve your financial goals.'
    },
    {
      question: 'Is credit repair legal?',
      answer: 'Absolutely. Credit repair is completely legal and protected under federal law. The Fair Credit Reporting Act (FCRA) grants us the legal right to dispute any inaccurate, incomplete, or unverifiable information on your credit report.'
    },
    {
      question: 'How much does the service cost?',
      answer: 'We offer customized plans tailored to your specific needs. Your initial consultation is completely free with no obligation. During this session, we&apos;ll thoroughly evaluate your situation and provide a personalized action plan with completely transparent pricing.'
    },
    {
      question: 'What guarantees do you offer?',
      answer: 'We stand behind our work with a 100% satisfaction guarantee. If you don&apos;t see significant credit score improvements within our agreed timeframe, we&apos;ll provide a full refund. With our proven 98% success rate, we&apos;re confident in delivering results.'
    },
    {
      question: 'Can I do it myself without professional help?',
      answer: 'While DIY credit repair is possible, the process is often complex, time-consuming, and frequently ineffective. Our specialized expertise, established relationships with credit bureaus, and proven strategies can dramatically accelerate your results while saving you countless hours of frustration.'
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
