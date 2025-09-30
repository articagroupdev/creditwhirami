import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentById, updateAppointmentStatus } from '@/lib/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { action } = body;
    
    console.log(`API POST request for appointment ${params.id} with action: ${action}`);
    console.log('Request body:', body);
    
    // Validate action
    if (!action || !['complete', 'cancel'].includes(action)) {
      console.error(`Invalid action: ${action}. Must be one of: complete, cancel`);
      return NextResponse.json(
        { error: 'Invalid action. Must be one of: complete, cancel' },
        { status: 400 }
      );
    }
    
    // Get the appointment first
    const appointment = getAppointmentById(params.id);
    if (!appointment) {
      console.error(`Appointment with ID ${params.id} not found`);
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    console.log('Found appointment:', appointment);
    
    // Map action to status
    const status = action === 'complete' ? 'completed' : 'cancelled';
    const previousStatus = appointment.status;
    
    // Update the appointment status
    const updatedAppointment = updateAppointmentStatus(params.id, status);
    
    if (!updatedAppointment) {
      console.error(`Failed to update appointment ${params.id}`);
      return NextResponse.json(
        { error: 'Failed to update appointment status' },
        { status: 500 }
      );
    }
    
    console.log(`Appointment ${params.id} successfully ${action}ed`);
    console.log('Updated appointment:', updatedAppointment);
    
    // Prepare response data
    const responseData = {
      success: true,
      action: action,
      appointment: updatedAppointment,
      message: `Appointment ${action}ed successfully`,
      previousStatus: previousStatus,
      newStatus: status,
      updatedAt: updatedAppointment.updatedAt,
      clientInfo: {
        name: updatedAppointment.name,
        email: updatedAppointment.email,
        phone: updatedAppointment.phone,
        businessName: updatedAppointment.businessName
      }
    };
    
    console.log('Response data:', responseData);
    
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('Error processing appointment action:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
