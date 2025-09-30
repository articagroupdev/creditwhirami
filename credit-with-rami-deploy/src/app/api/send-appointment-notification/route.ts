import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Sending appointment notification:', body);
    
    const {
      clientName,
      clientEmail,
      businessName,
      appointmentDate,
      appointmentTime,
      status
    } = body;

    // Validate required fields
    if (!clientName || !clientEmail || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, clientEmail, status' },
        { status: 400 }
      );
    }

    // Generate email content based on status
    const emailContent = generateEmailContent({
      clientName,
      businessName,
      appointmentDate,
      appointmentTime,
      status,
      eligibility: true,
      fundingAmount: 'N/A',
      message: 'N/A'
    });

    // In a real application, you would send the email here using a service like:
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    // - Resend
    // For now, we'll just log the email content
    
    console.log('Email notification prepared:');
    console.log('To:', clientEmail);
    console.log('Subject:', emailContent.subject);
    console.log('Body:', emailContent.body);

    // Simulate email sending
    const emailSent = await simulateEmailSending(clientEmail, emailContent);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Notification sent successfully',
        notificationType: 'email',
        recipient: clientEmail,
        status: status
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error sending appointment notification:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function generateEmailContent(data: {
  clientName: string;
  businessName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  eligibility: boolean;
  fundingAmount: string;
  message: string;
}) {
  const { clientName, businessName, appointmentDate, appointmentTime, status, eligibility, fundingAmount } = data;

  const statusConfig = {
    confirmed: {
      subject: '🎉 Your Business Funding Appointment is Confirmed!',
      emoji: '🎉',
      title: 'APPOINTMENT CONFIRMED',
      message: 'Great news! Your appointment has been confirmed and we\'re excited to help you secure your business funding.',
      nextSteps: [
        'Please be ready for our call at the scheduled time',
        'Have any additional business documents ready',
        'Prepare any questions you may have about funding options',
        'If you need to reschedule, please contact us as soon as possible'
      ]
    },
    completed: {
      subject: '✅ Thank You - Your Business Funding Consultation is Complete',
      emoji: '✅',
      title: 'CONSULTATION COMPLETED',
      message: 'Thank you for your time! We hope our consultation was helpful for your business funding needs.',
      nextSteps: [
        'Review the funding options we discussed',
        'Gather any additional documents we mentioned',
        'Feel free to reach out with any follow-up questions',
        'We\'re here to help you secure the funding your business deserves'
      ]
    },
    cancelled: {
      subject: '⚠️ Your Business Funding Appointment Has Been Cancelled',
      emoji: '⚠️',
      title: 'APPOINTMENT CANCELLED',
      message: 'Your appointment has been cancelled. We understand that schedules can change.',
      nextSteps: [
        'If you\'d like to reschedule, please contact us',
        'We\'ll be happy to find a new time that works for you',
        'We\'re still here to help you secure your business funding',
        'Don\'t hesitate to reach out when you\'re ready'
      ]
    },
    pending: {
      subject: '📋 Your Business Funding Appointment Status Update',
      emoji: '📋',
      title: 'STATUS UPDATE',
      message: 'Your appointment status has been updated to pending. We\'re reviewing your details.',
      nextSteps: [
        'We\'re reviewing your appointment details',
        'We\'ll confirm your appointment shortly',
        'Please stay tuned for updates',
        'Thank you for your patience'
      ]
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .next-steps { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${config.emoji} ${config.title}</h1>
        <p>Credit With Rami - Business Funding Solutions</p>
    </div>
    
    <div class="content">
        <h2>Hello ${clientName}!</h2>
        
        <p>${config.message}</p>
        
        <div class="appointment-details">
            <h3>📋 Appointment Details</h3>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            ${eligibility ? `<p><strong>Eligibility:</strong> <span style="color: #10b981;">✅ Eligible for Funding</span></p>` : ''}
            ${fundingAmount ? `<p><strong>Funding Amount:</strong> ${fundingAmount}</p>` : ''}
        </div>
        
        <div class="next-steps">
            <h3>📝 Next Steps</h3>
            <ul>
                ${config.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/17868835543" class="button">💬 Contact Us on WhatsApp</a>
        </div>
        
        <p>If you have any questions or need immediate assistance, please don't hesitate to reach out to us.</p>
        
        <p>We're committed to helping you secure the funding your business deserves!</p>
        
        <div class="footer">
            <p><strong>Credit With Rami</strong></p>
            <p>📞 Phone: (786) 883-5543</p>
            <p>💬 WhatsApp: +1 (786) 883-5543</p>
            <p>🌐 Website: Your Business Funding Partner</p>
        </div>
    </div>
</body>
</html>
  `;

  return {
    subject: config.subject,
    body: emailBody
  };
}

async function simulateEmailSending(email: string, content: { subject: string; body: string }): Promise<boolean> {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, you would integrate with an email service here
  // For now, we'll just return true to simulate successful sending
  console.log(`📧 Email would be sent to: ${email}`);
  console.log(`📧 Subject: ${content.subject}`);
  
  return true;
}
