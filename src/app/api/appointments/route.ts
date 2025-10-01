import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAllAppointments } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'name', 'email', 'phone', 'businessName', 'businessType',
      'creditCards', 'establishedBusiness', 'strongCreditScore', 'cleanHistory',
      'preferredDate', 'preferredTime', 'timezone', 'isEligible', 'eligibilityReason'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const appointment = createAppointment({
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      businessType: body.businessType,
      creditCards: body.creditCards,
      establishedBusiness: body.establishedBusiness,
      strongCreditScore: body.strongCreditScore,
      cleanHistory: body.cleanHistory,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      timezone: body.timezone,
      message: body.message || '',
      isEligible: body.isEligible,
      eligibilityReason: body.eligibilityReason
    });
    
    return NextResponse.json({ 
      success: true, 
      appointment,
      message: 'Appointment created successfully' 
    });
    
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    let appointments = getAllAppointments();
    
    // Filter by date if provided
    if (date) {
      appointments = appointments.filter(app => app.preferredDate === date);
    }
    
    // Filter by date range if provided
    if (startDate && endDate) {
      appointments = appointments.filter(app => {
        const appointmentDate = new Date(app.preferredDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return appointmentDate >= start && appointmentDate <= end;
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      appointments 
    });
    
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
