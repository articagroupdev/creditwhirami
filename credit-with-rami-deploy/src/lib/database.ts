// Simple in-memory database for appointments
// In production, you would use a real database like PostgreSQL, MongoDB, etc.

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  monthlyRevenue: string;
  creditCards: string;
  establishedBusiness: string;
  strongCreditScore: string;
  cleanHistory: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message: string;
  urgency: string;
  fundingAmount: string;
  isEligible: boolean;
  eligibilityReason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password: string; // In production, this should be hashed
  name: string;
  role: 'admin';
  createdAt: string;
}

// In-memory storage with localStorage persistence (replace with real database in production)
let appointments: Appointment[] = [];
const adminUsers: AdminUser[] = [
  {
    id: '1',
    username: 'rami',
    password: 'rami123', // In production, use bcrypt to hash passwords
    name: 'Rami',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Load appointments from localStorage on initialization
if (typeof window !== 'undefined') {
  const savedAppointments = localStorage.getItem('appointments');
  if (savedAppointments) {
    try {
      appointments = JSON.parse(savedAppointments);
    } catch (error) {
      console.error('Error loading appointments from localStorage:', error);
    }
  }
}

// Appointment functions
export const createAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Appointment => {
  console.log('Creating appointment with data:', appointmentData);
  
  const appointment: Appointment = {
    ...appointmentData,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  appointments.push(appointment);
  console.log(`Appointment created with ID: ${appointment.id}. Total appointments: ${appointments.length}`);
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Appointments saved to localStorage');
  }
  
  return appointment;
};

export const getAllAppointments = (): Appointment[] => {
  console.log(`Getting all appointments. Current count: ${appointments.length}`);
  const sortedAppointments = appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  console.log('Returning sorted appointments:', sortedAppointments);
  return sortedAppointments;
};

export const getAppointmentById = (id: string): Appointment | undefined => {
  return appointments.find(appointment => appointment.id === id);
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): Appointment | null => {
  console.log(`Updating appointment ${id} to status: ${status}`);
  
  const appointment = appointments.find(app => app.id === id);
  if (appointment) {
    const previousStatus = appointment.status;
    appointment.status = status;
    appointment.updatedAt = new Date().toISOString();
    
    console.log(`Appointment ${id} status changed from ${previousStatus} to ${status}`);
    console.log('Updated appointment:', appointment);
    
    // Save to localStorage (only on client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem('appointments', JSON.stringify(appointments));
      console.log('Appointments saved to localStorage after status update');
    } else {
      // On server side, we'll save to localStorage when the client fetches
      console.log('Server side update - localStorage will be updated on client side');
    }
    
    return appointment;
  }
  
  console.error(`Appointment with ID ${id} not found`);
  return null;
};

export const getAppointmentsByDate = (date: string): Appointment[] => {
  return appointments.filter(appointment => appointment.preferredDate === date);
};

export const getAppointmentsByDateRange = (startDate: string, endDate: string): Appointment[] => {
  return appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.preferredDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return appointmentDate >= start && appointmentDate <= end;
  });
};

// Admin authentication functions
export const authenticateAdmin = (username: string, password: string): AdminUser | null => {
  const admin = adminUsers.find(user => user.username === username && user.password === password);
  return admin || null;
};

export const getAdminById = (id: string): AdminUser | undefined => {
  return adminUsers.find(user => user.id === id);
};

// Statistics functions
export const getAppointmentStats = () => {
  const total = appointments.length;
  const eligible = appointments.filter(app => app.isEligible).length;
  const pending = appointments.filter(app => app.status === 'pending').length;
  const confirmed = appointments.filter(app => app.status === 'confirmed').length;
  const completed = appointments.filter(app => app.status === 'completed').length;
  const cancelled = appointments.filter(app => app.status === 'cancelled').length;

  return {
    total,
    eligible,
    pending,
    confirmed,
    completed,
    cancelled,
    eligibilityRate: total > 0 ? (eligible / total) * 100 : 0
  };
};

// Function to reload appointments from localStorage
export const reloadAppointments = () => {
  if (typeof window !== 'undefined') {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      try {
        appointments = JSON.parse(savedAppointments);
        return appointments;
      } catch (error) {
        console.error('Error reloading appointments from localStorage:', error);
      }
    }
  }
  return appointments;
};
