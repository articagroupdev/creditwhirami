import { NextResponse } from 'next/server';
import { createAppointment, getAllAppointments } from '@/lib/database';

export async function POST() {
  try {
    console.log('=== TEST APPOINTMENT API ===');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-1234',
      businessName: 'Test Business',
      businessType: 'Retail',
      monthlyRevenue: '$10,000 - $25,000',
      creditCards: 'Yes',
      establishedBusiness: 'Yes',
      strongCreditScore: 'Yes',
      cleanHistory: 'No',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM',
      timezone: 'EST',
      message: 'This is a test appointment',
      urgency: 'High',
      fundingAmount: '$50,000 - $100,000',
      isEligible: true,
      eligibilityReason: 'Eligible'
    };

    console.log('Creating test appointment with data:', testData);
    
    const appointment = createAppointment(testData);
    
    console.log('Test appointment created:', appointment);
    
    const allAppointments = getAllAppointments();
    console.log(`Total appointments after creation: ${allAppointments.length}`);
    
    return NextResponse.json({ 
      success: true, 
      appointment,
      totalAppointments: allAppointments.length,
      allAppointments,
      message: 'Test appointment created successfully' 
    });
    
  } catch (error) {
    console.error('Error creating test appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('=== TEST APPOINTMENT GET ===');
    
    const appointments = getAllAppointments();
    console.log(`Found ${appointments.length} appointments`);
    
    return NextResponse.json({ 
      success: true, 
      appointments,
      count: appointments.length,
      message: 'Test appointments retrieved successfully' 
    });
    
  } catch (error) {
    console.error('Error fetching test appointments:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
