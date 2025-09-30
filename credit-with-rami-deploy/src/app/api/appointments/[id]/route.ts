import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentById, updateAppointmentStatus } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = getAppointmentById(params.id);
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      appointment 
    });
    
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;
    
    console.log(`API PATCH request for appointment ${params.id} with status: ${status}`);
    console.log('Request body:', body);
    
    if (!status || !['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      console.error(`Invalid status: ${status}. Must be one of: pending, confirmed, completed, cancelled`);
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, confirmed, completed, cancelled' },
        { status: 400 }
      );
    }
    
    const appointment = updateAppointmentStatus(params.id, status);
    
    if (!appointment) {
      console.error(`Appointment with ID ${params.id} not found`);
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    console.log(`Appointment ${params.id} successfully updated to ${status}`);
    console.log('Updated appointment:', appointment);
    
    return NextResponse.json({ 
      success: true, 
      appointment,
      message: `Appointment status updated to ${status} successfully`,
      previousStatus: appointment.status,
      newStatus: status,
      updatedAt: appointment.updatedAt
    });
    
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
