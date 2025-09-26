import { NextRequest, NextResponse } from 'next/server'

interface ConsultationData {
  name: string
  email: string
  phone?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsultationData = await request.json()
    const { name, email, phone, message } = body

    // Validate required data
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Prepare email content
    const emailContent = {
      to: 'info@creditwhitrami.com',
      subject: 'New Free Consultation - Credit with Rami',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0;">New Free Consultation</h1>
              <p style="color: #6b7280; margin: 10px 0 0 0;">Request from website</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Client Information</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #1f2937;">Name:</strong>
                <span style="color: #4b5563; margin-left: 10px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #1f2937;">Email:</strong>
                <span style="color: #4b5563; margin-left: 10px;">${email}</span>
              </div>
              
              ${phone ? `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1f2937;">Phone:</strong>
                  <span style="color: #4b5563; margin-left: 10px;">${phone}</span>
                </div>
              ` : ''}
            </div>
            
            ${message ? `
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Client Message:</h3>
                <p style="color: #1e40af; margin: 0; line-height: 1.6;">${message}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                This message was sent from the free consultation form on 
                <strong>creditwhitrami.com</strong>
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
                Date: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'America/New_York',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Here you should implement the email sending service
    // For example, using SendGrid, Nodemailer, or your preferred service
    
    // NOTE: To implement real email sending, you would need:
    // 1. Install a service like SendGrid: npm install @sendgrid/mail
    // 2. Configure environment variables with credentials
    // 3. Implement real sending
    
    // Example with SendGrid (commented):
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    await sgMail.send({
      to: 'info@creditwhitrami.com',
      from: 'noreply@creditwhitrami.com', // must be a verified email in SendGrid
      subject: emailContent.subject,
      html: emailContent.html,
    })
    */

    // For now, we'll simulate successful sending
    console.log('Email would be sent to:', emailContent.to)
    console.log('Subject:', emailContent.subject)
    console.log('From:', name, '-', email)

    // Successful response
    return NextResponse.json({
      success: true,
      message: 'Consultation request sent successfully',
      data: {
        name,
        email,
        phone: phone || null,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error processing consultation request:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process consultation request'
      },
      { status: 500 }
    )
  }
}

// Handle not allowed methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
