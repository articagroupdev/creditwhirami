import { NextRequest, NextResponse } from 'next/server';
import { createAppointment, getAllAppointments } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API received appointment data:', body);
    
    // Validate required fields
    const requiredFields = [
      'name', 'email', 'phone', 'businessName', 'businessType', 'monthlyRevenue',
      'creditCards', 'establishedBusiness', 'strongCreditScore', 'cleanHistory',
      'preferredDate', 'preferredTime', 'timezone', 'isEligible', 'eligibilityReason'
    ];
    
    console.log('Validating required fields...');
    for (const field of requiredFields) {
      if (!body[field]) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    console.log('All required fields present');
    
    console.log('Creating appointment with data:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      businessType: body.businessType,
      monthlyRevenue: body.monthlyRevenue,
      creditCards: body.creditCards,
      establishedBusiness: body.establishedBusiness,
      strongCreditScore: body.strongCreditScore,
      cleanHistory: body.cleanHistory,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      timezone: body.timezone,
      message: body.message || '',
      urgency: body.urgency || '',
      fundingAmount: body.fundingAmount || '',
      isEligible: body.isEligible,
      eligibilityReason: body.eligibilityReason
    });

    const appointment = createAppointment({
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      businessType: body.businessType,
      monthlyRevenue: body.monthlyRevenue,
      creditCards: body.creditCards,
      establishedBusiness: body.establishedBusiness,
      strongCreditScore: body.strongCreditScore,
      cleanHistory: body.cleanHistory,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      timezone: body.timezone,
      message: body.message || '',
      urgency: body.urgency || '',
      fundingAmount: body.fundingAmount || '',
      isEligible: body.isEligible,
      eligibilityReason: body.eligibilityReason
    });
    
    console.log('Appointment created successfully:', appointment);
    
    return NextResponse.json({ 
      success: true, 
      appointment,
      message: 'Appointment created successfully' 
    });
    
  } catch (error) {
    console.error('Error creating appointment:', error);
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
    
    console.log('API GET request - fetching appointments');
    let appointments = getAllAppointments();
    console.log(`Found ${appointments.length} appointments`);
    
    // Filter by date if provided
    if (date) {
      appointments = appointments.filter(app => app.preferredDate === date);
      console.log(`Filtered by date ${date}: ${appointments.length} appointments`);
    }
    
    // Filter by date range if provided
    if (startDate && endDate) {
      appointments = appointments.filter(app => {
        const appointmentDate = new Date(app.preferredDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return appointmentDate >= start && appointmentDate <= end;
      });
      console.log(`Filtered by date range ${startDate} to ${endDate}: ${appointments.length} appointments`);
    }
    
    console.log('Returning appointments:', appointments);
    
    return NextResponse.json({ 
      success: true, 
      appointments 
    });
    
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
