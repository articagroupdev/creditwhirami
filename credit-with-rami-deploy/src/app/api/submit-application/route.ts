import { NextRequest, NextResponse } from 'next/server'

interface ApplicationData {
  name: string
  email: string
  phone: string
  businessName: string
  creditCards: string
  establishedBusiness: string
  strongCreditScore: string
  cleanHistory: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos requeridos
    const requiredFields = ['name', 'email', 'phone', 'businessName', 'creditCards', 'establishedBusiness', 'strongCreditScore', 'cleanHistory']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Preparar datos para envío
    const applicationData = {
      timestamp: new Date().toISOString(),
      personalInfo: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        businessName: body.businessName
      },
      eligibility: {
        creditCards: body.creditCards,
        establishedBusiness: body.establishedBusiness,
        strongCreditScore: body.strongCreditScore,
        cleanHistory: body.cleanHistory
      },
      isEligible: determineEligibility(body),
      eligibilityReason: getEligibilityReason(body),
      message: body.message || 'No additional message'
    }

    // Aquí iría la lógica real de envío de email
    // Por ahora solo logueamos los datos
    console.log('=== NEW APPLICATION SUBMISSION ===')
    console.log('Email to: info@creditwithrami.com')
    console.log('Data:', JSON.stringify(applicationData, null, 2))
    console.log('===================================')

    // Simular envío exitoso
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: applicationData
    })

  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function determineEligibility(data: ApplicationData): boolean {
  // Si responden No de la 1ra a la 3era pregunta = no elegible
  if (data.creditCards === 'No' || 
      data.establishedBusiness === 'No' || 
      data.strongCreditScore === 'No') {
    return false
  }
  
  // Si responden Si en la 4ta = no elegible
  if (data.cleanHistory === 'Yes') {
    return false
  }
  
  return true
}

function getEligibilityReason(data: ApplicationData): string {
  if (data.creditCards === 'No') return 'Less than 2 credit cards totaling $5,000+'
  if (data.establishedBusiness === 'No') return 'Business not established for 6+ months'
  if (data.strongCreditScore === 'No') return 'Credit score below 700'
  if (data.cleanHistory === 'Yes') return 'Has late payments, collections, or bankruptcies'
  return 'Eligible'
}
