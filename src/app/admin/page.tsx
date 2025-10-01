'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Calendar, Clock, User, Phone, Mail, Building, CheckCircle, AlertCircle, X, LogOut, Search, Filter, Download, TrendingUp, Users, BarChart3, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { Appointment, reloadAppointments } from '@/lib/database'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AdminDashboardProps {
  // No props needed for this component
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('all')
  const [currentView, setCurrentView] = useState<'calendar' | 'list' | 'analytics'>('calendar')
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [updateMessage, setUpdateMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [actionHistory, setActionHistory] = useState<Array<{
    id: string
    action: string
    appointmentId: string
    clientName: string
    timestamp: string
    status: string
  }>>([])
  const [stats, setStats] = useState({
    total: 0,
    eligible: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    eligibilityRate: 0
  })

  const checkAuth = () => {
    // In production, check JWT token
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoggingIn(true)
    
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        // In production, store JWT token
        localStorage.setItem('adminToken', 'authenticated')
        localStorage.setItem('adminUser', JSON.stringify(data.admin))
        setIsAuthenticated(true)
      } else {
        alert('Invalid credentials')
      }
    } catch {
      alert('Login failed')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
  }

  const fetchAppointments = useCallback(async (forceRefresh = false) => {
    try {
      
      // If force refresh, always get from API
      if (forceRefresh) {
        const response = await fetch('/api/appointments')
        const data = await response.json()
        
        if (data.success) {
          setAppointments(data.appointments)
          calculateStats(data.appointments)
          
          // Update localStorage with fresh data
          if (typeof window !== 'undefined') {
            localStorage.setItem('appointments', JSON.stringify(data.appointments))
          }
        }
        return
      }

      // First reload from localStorage
      const localAppointments = reloadAppointments()
      if (localAppointments.length > 0) {
        setAppointments(localAppointments)
        calculateStats(localAppointments)
        setLoading(false)
        return
      }

      // If no local data, try API
      const response = await fetch('/api/appointments')
      const data = await response.json()
      
      if (data.success) {
        setAppointments(data.appointments)
        calculateStats(data.appointments)
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('appointments', JSON.stringify(data.appointments))
        }
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshAppointments = () => {
    setLoading(true)
    fetchAppointments(true)
  }

  // Check authentication on component mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Fetch appointments when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments()
    }
  }, [isAuthenticated, selectedDate, fetchAppointments])






  const calculateStats = (appointments: Appointment[]) => {
    
    const total = appointments.length
    const eligible = appointments.filter(app => app.isEligible).length
    const pending = appointments.filter(app => app.status === 'pending').length
    const confirmed = appointments.filter(app => app.status === 'confirmed').length
    const completed = appointments.filter(app => app.status === 'completed').length
    const cancelled = appointments.filter(app => app.status === 'cancelled').length


    const newStats = {
      total,
      eligible,
      pending,
      confirmed,
      completed,
      cancelled,
      eligibilityRate: total > 0 ? (eligible / total) * 100 : 0
    }

    setStats(newStats)
  }



  const handleCompleteAppointment = async () => {
    if (!selectedAppointment) return
    
    const confirmed = window.confirm(
      `✅ MARK APPOINTMENT AS COMPLETED\n\n` +
      `Client: ${selectedAppointment.name}\n` +
      `Business: ${selectedAppointment.businessName}\n` +
      `Date: ${selectedAppointment.preferredDate}\n` +
      `Time: ${selectedAppointment.preferredTime}\n\n` +
      `This will move the client to "Attended Appointments" and notify them that the consultation was completed successfully.\n\n` +
      `This action cannot be undone.`
    )
    
    if (confirmed) {
      await executeAppointmentAction(selectedAppointment.id, 'complete')
    }
  }

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return
    
    const confirmed = window.confirm(
      `❌ CANCEL APPOINTMENT\n\n` +
      `Client: ${selectedAppointment.name}\n` +
      `Business: ${selectedAppointment.businessName}\n` +
      `Date: ${selectedAppointment.preferredDate}\n` +
      `Time: ${selectedAppointment.preferredTime}\n\n` +
      `This will move the client to "Cancelled Appointments" and notify them that the appointment has been cancelled.\n\n` +
      `This action cannot be undone.`
    )
    
    if (confirmed) {
      await executeAppointmentAction(selectedAppointment.id, 'cancel')
    }
  }

  const executeAppointmentAction = async (id: string, action: 'complete' | 'cancel') => {
    setIsUpdatingStatus(true)
    setUpdateMessage(null)

    try {
      
      const response = await fetch(`/api/appointments/${id}/actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      const data = await response.json()

      if (data.success) {
        
        // Update the selected appointment with new status
        if (selectedAppointment && selectedAppointment.id === id) {
          const updatedAppointment = { ...selectedAppointment, status: data.newStatus }
          setSelectedAppointment(updatedAppointment)
        }
        
        // Add to action history
        const historyEntry = {
          id: Date.now().toString(),
          action: action,
          appointmentId: id,
          clientName: selectedAppointment?.name || 'Unknown',
          timestamp: new Date().toISOString(),
          status: data.newStatus
        }
        setActionHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10 actions
        
        // Send notification to client
        await sendClientNotification(selectedAppointment!, data.newStatus)
        
        // Refresh appointments and stats with force refresh
        await fetchAppointments(true)
        
        // Show success message
        const successMessage = action === 'complete' 
          ? '✅ Appointment marked as completed! Client moved to attended appointments and notified.'
          : '❌ Appointment cancelled! Client moved to cancelled appointments and notified.'
        
        setUpdateMessage({
          type: 'success',
          text: successMessage
        })
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
          setUpdateMessage(null)
        }, 3000)
        
        // Close modal after successful update
        setTimeout(() => {
          setSelectedAppointment(null)
        }, 1500)
        
      } else {
        setUpdateMessage({
          type: 'error',
          text: data.error || `Failed to ${action} appointment`
        })
      }
    } catch {
      setUpdateMessage({
        type: 'error',
        text: `Network error. Please try again.`
      })
    } finally {
      setIsUpdatingStatus(false)
    }
  }


  const sendClientNotification = async (appointment: Appointment, status: Appointment['status']) => {
    try {
      
      // Prepare notification data
      const notificationData = {
        appointmentId: appointment.id,
        clientName: appointment.name,
        clientEmail: appointment.email,
        clientPhone: appointment.phone,
        businessName: appointment.businessName,
        appointmentDate: appointment.preferredDate,
        appointmentTime: appointment.preferredTime,
        status: status,
        eligibility: appointment.isEligible,
        message: appointment.message
      }

      // Send email notification
      const emailResponse = await fetch('/api/send-appointment-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...notificationData,
          type: 'email'
        }),
      })

      if (emailResponse.ok) {
      } else {
      }

      // Send WhatsApp notification (optional - opens WhatsApp web)
      if (appointment.phone) {
        const whatsappMessage = generateWhatsAppMessage(appointment, status)
        const whatsappUrl = `https://wa.me/1${appointment.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank')
      }

    } catch {
    }
  }

  const generateWhatsAppMessage = (appointment: Appointment, status: Appointment['status']) => {
    const statusMessages = {
      confirmed: `🎉 Great news! Your appointment has been CONFIRMED.

📅 Date: ${appointment.preferredDate}
⏰ Time: ${appointment.preferredTime}
🏢 Business: ${appointment.businessName}

We're excited to help you secure your business funding! Please be ready for our call and have any additional documents ready.

If you need to reschedule, please contact us as soon as possible.

Best regards,
Rami - Credit With Rami`,

      completed: `✅ Thank you for your time! Your appointment has been marked as COMPLETED.

We hope our consultation was helpful for your business funding needs. If you have any follow-up questions or need additional assistance, please don't hesitate to reach out.

We're here to help you secure the funding your business deserves!

Best regards,
Rami - Credit With Rami`,

      cancelled: `⚠️ Your appointment has been CANCELLED.

📅 Date: ${appointment.preferredDate}
⏰ Time: ${appointment.preferredTime}

We understand that schedules can change. If you'd like to reschedule your business funding consultation, please let us know and we'll be happy to find a new time that works for you.

We're still here to help you secure your business funding!

Best regards,
Rami - Credit With Rami`,

      pending: `📋 Your appointment status has been updated to PENDING.

📅 Date: ${appointment.preferredDate}
⏰ Time: ${appointment.preferredTime}

We're reviewing your appointment details and will confirm shortly. Please stay tuned for updates.

Thank you for your patience!

Best regards,
Rami - Credit With Rami`
    }

    return statusMessages[status] || 'Your appointment status has been updated. Please contact us for more information.'
  }

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(app => app.preferredDate === date)
  }

  const getFilteredAppointments = () => {
    let filtered = appointments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    // Eligibility filter
    if (eligibilityFilter !== 'all') {
      filtered = filtered.filter(app => 
        eligibilityFilter === 'eligible' ? app.isEligible : !app.isEligible
      )
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const exportAppointments = () => {
    const filteredAppointments = getFilteredAppointments()
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Business', 'Date', 'Time', 'Status', 'Eligible', 'Funding Amount'].join(','),
      ...filteredAppointments.map(app => [
        app.name,
        app.email,
        app.phone,
        app.businessName,
        app.preferredDate,
        app.preferredTime,
        app.status,
        app.isEligible ? 'Yes' : 'No'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calendar utility functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(app => app.preferredDate === dateStr)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth() &&
      day === today.getDate()
    )
  }

  const isSelected = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return selectedDate === dateStr
  }

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image 
                src="/cwr-logo-1.png" 
                alt="Credit With Rami Logo" 
                width={350}
                height={140}
                className="w-[350px] h-auto object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-blue-200">Access the appointment dashboard</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter username"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center">
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </div>
              </button>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-blue-300 mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-200">Demo Credentials</p>
                  <div className="mt-1 text-sm text-blue-100">
                    <p><strong>Username:</strong> rami</p>
                    <p><strong>Password:</strong> rami123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              © 2024 Credit With Rami. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Image 
                src="/favicon.png" 
                alt="Credit With Rami Logo" 
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage scheduled appointments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshAppointments}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'calendar' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'list' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              List View
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentView === 'analytics' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={exportAppointments}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>


        {/* Action History Panel */}
        {actionHistory.length > 0 && (
          <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Actions
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {actionHistory.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      entry.action === 'complete' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {entry.action === 'complete' ? 'Completed' : 'Cancelled'} appointment
                      </p>
                      <p className="text-purple-200 text-xs">
                        Client: {entry.clientName} • {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    entry.status === 'completed' 
                      ? 'bg-green-500/20 text-green-200' 
                      : 'bg-red-500/20 text-red-200'
                  }`}>
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Cards - Conditional based on view */}
        {currentView === 'calendar' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-blue-200">Total</p>
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-yellow-200">Pending</p>
                  <p className="text-xl font-bold text-white">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-green-200">Completed</p>
                  <p className="text-xl font-bold text-white">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <X className="w-5 h-5 text-red-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-red-200">Cancelled</p>
                  <p className="text-xl font-bold text-white">{stats.cancelled}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-blue-200">Total</p>
                  <p className="text-xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-green-200">Eligible</p>
                  <p className="text-xl font-bold text-white">{stats.eligible}</p>
                  <p className="text-xs text-green-300">{stats.eligibilityRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-yellow-200">Pending</p>
                  <p className="text-xl font-bold text-white">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-blue-200">Confirmed</p>
                  <p className="text-xl font-bold text-white">{stats.confirmed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-green-200">Completed</p>
                  <p className="text-xl font-bold text-white">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <X className="w-5 h-5 text-red-300" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-red-200">Cancelled</p>
                  <p className="text-xl font-bold text-white">{stats.cancelled}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-gray-800 text-white">All Status</option>
              <option value="pending" className="bg-gray-800 text-white">Pending</option>
              <option value="confirmed" className="bg-gray-800 text-white">Confirmed</option>
              <option value="completed" className="bg-gray-800 text-white">Completed</option>
              <option value="cancelled" className="bg-gray-800 text-white">Cancelled</option>
            </select>
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-gray-800 text-white">All Eligibility</option>
              <option value="eligible" className="bg-gray-800 text-white">Eligible</option>
              <option value="not-eligible" className="bg-gray-800 text-white">Not Eligible</option>
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-white" />
              <span className="text-white text-sm">
                {getFilteredAppointments().length} appointments
              </span>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {currentView === 'calendar' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Appointment Calendar</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <h3 className="text-lg font-semibold text-white min-w-[200px] text-center">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                  <div className="bg-white/5 rounded-xl p-4">
                    {/* Calendar Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-blue-200">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, emptyIndex) => (
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        <div key={`empty-${emptyIndex}`} className="h-20"></div>
                      ))}
                      
                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1).map((day) => {
                        const dayAppointments = getAppointmentsForDay(day)
                        
                        return (
                          <div
                            key={day}
                            className={`h-20 p-1 border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-white/10 ${
                              isToday(day) ? 'bg-blue-500/20 border-blue-400' : ''
                            } ${isSelected(day) ? 'bg-blue-600/30 border-blue-400' : ''}`}
                            onClick={() => {
                              const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                              setSelectedDate(dateStr)
                            }}
                          >
                            <div className="flex flex-col h-full">
                              <div className={`text-sm font-medium ${isToday(day) ? 'text-blue-300' : 'text-white'}`}>
                                {day}
                              </div>
                              <div className="flex-1 flex flex-col justify-end">
                                {dayAppointments.slice(0, 2).map((appointment) => (
                                  <div
                                    key={appointment.id}
                                    className={`text-xs p-1 rounded mb-1 truncate ${
                                      appointment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200' :
                                      appointment.status === 'confirmed' ? 'bg-blue-500/20 text-blue-200' :
                                      appointment.status === 'completed' ? 'bg-green-500/20 text-green-200' :
                                      'bg-red-500/20 text-red-200'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedAppointment(appointment)
                                    }}
                                  >
                                    {appointment.preferredTime} - {appointment.name}
                                  </div>
                                ))}
                                {dayAppointments.length > 2 && (
                                  <div className="text-xs text-gray-400 text-center">
                                    +{dayAppointments.length - 2} more
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Date Appointments */}
                <div>
                  <h3 className="text-md font-medium text-white mb-4">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <div className="space-y-3">
                    {getAppointmentsForDate(selectedDate).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">{appointment.name}</p>
                            <p className="text-sm text-blue-200">{appointment.businessName}</p>
                            <p className="text-sm text-gray-300">{appointment.preferredTime}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            {appointment.isEligible ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getAppointmentsForDate(selectedDate).length === 0 && (
                      <p className="text-gray-400 text-center py-8">No appointments for this date</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List View - Categorized by Eligibility */}
        {currentView === 'list' && (
          <div className="space-y-6">
            {/* Eligible Appointments */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <h2 className="text-lg font-semibold text-white">Eligible Appointments</h2>
                  <span className="ml-3 px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm">
                    {getFilteredAppointments().filter(app => app.isEligible).length}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getFilteredAppointments().filter(app => app.isEligible).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white/5 border border-green-500/20 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium text-white">{appointment.name}</p>
                              <p className="text-sm text-blue-200">{appointment.businessName}</p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-blue-200">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {appointment.preferredDate}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {appointment.preferredTime}
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {appointment.email}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {getFilteredAppointments().filter(app => app.isEligible).length === 0 && (
                    <p className="text-gray-400 text-center py-8">No eligible appointments found</p>
                  )}
                </div>
              </div>
            </div>

            {/* Not Eligible Appointments */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
                  <h2 className="text-lg font-semibold text-white">Not Eligible Appointments</h2>
                  <span className="ml-3 px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm">
                    {getFilteredAppointments().filter(app => !app.isEligible).length}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getFilteredAppointments().filter(app => !app.isEligible).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white/5 border border-red-500/20 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <p className="font-medium text-white">{appointment.name}</p>
                              <p className="text-sm text-blue-200">{appointment.businessName}</p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-blue-200">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {appointment.preferredDate}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {appointment.preferredTime}
                              </div>
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {appointment.email}
                              </div>
                            </div>
                          </div>
                          {appointment.eligibilityReason && (
                            <div className="mt-2 p-2 bg-red-500/10 rounded-lg">
                              <p className="text-xs text-red-200">
                                <strong>Reason:</strong> {appointment.eligibilityReason}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {getFilteredAppointments().filter(app => !app.isEligible).length === 0 && (
                    <p className="text-gray-400 text-center py-8">No non-eligible appointments found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-lg font-semibold text-white">Analytics Dashboard</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Eligibility Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Eligible</span>
                      <span className="text-white font-semibold">{stats.eligible}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Not Eligible</span>
                      <span className="text-white font-semibold">{stats.total - stats.eligible}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${stats.eligibilityRate}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-300">{stats.eligibilityRate.toFixed(1)}% eligibility rate</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Status Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Pending</span>
                      <span className="text-white font-semibold">{stats.pending}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Confirmed</span>
                      <span className="text-white font-semibold">{stats.confirmed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Completed</span>
                      <span className="text-white font-semibold">{stats.completed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Cancelled</span>
                      <span className="text-white font-semibold">{stats.cancelled}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Appointment Details</h3>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-white">{selectedAppointment.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Email</p>
                          <p className="text-white">{selectedAppointment.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Phone</p>
                          <p className="text-white">{selectedAppointment.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Business</p>
                          <p className="text-white">{selectedAppointment.businessName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Business Type</p>
                          <p className="text-white">{selectedAppointment.businessType}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Date</p>
                          <p className="text-white">{selectedAppointment.preferredDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-300 mr-3" />
                        <div>
                          <p className="text-sm text-blue-200">Time</p>
                          <p className="text-white">{selectedAppointment.preferredTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {selectedAppointment.isEligible ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                        )}
                        <div>
                          <p className="text-sm text-blue-200">Eligibility</p>
                          <p className="text-white">
                            {selectedAppointment.isEligible ? 'Eligible' : 'Not Eligible'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Eligibility Details */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Eligibility Assessment</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-200">Credit Cards (2+ totaling $5K+)</p>
                        <p className="text-white">{selectedAppointment.creditCards}</p>
                      </div>
                      <div>
                        <p className="text-blue-200">Established Business (6+ months)</p>
                        <p className="text-white">{selectedAppointment.establishedBusiness}</p>
                      </div>
                      <div>
                        <p className="text-blue-200">Strong Credit Score (700+)</p>
                        <p className="text-white">{selectedAppointment.strongCreditScore}</p>
                      </div>
                      <div>
                        <p className="text-blue-200">Clean Credit History</p>
                        <p className="text-white">{selectedAppointment.cleanHistory}</p>
                      </div>
                    </div>
                    {selectedAppointment.eligibilityReason && (
                      <div className="mt-3 p-3 bg-blue-500/20 rounded-lg">
                        <p className="text-sm text-blue-200">
                          <strong>Reason:</strong> {selectedAppointment.eligibilityReason}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {selectedAppointment.message && (
                    <div>
                      <p className="text-sm font-medium text-blue-200 mb-2">Message</p>
                      <p className="text-white bg-white/5 rounded-lg p-3">{selectedAppointment.message}</p>
                    </div>
                  )}
                  
                  {/* Status Update Message */}
                  {updateMessage && (
                    <div className={`p-4 rounded-lg ${
                      updateMessage.type === 'success' 
                        ? 'bg-green-500/20 border border-green-400/30 text-green-200' 
                        : 'bg-red-500/20 border border-red-400/30 text-red-200'
                    }`}>
                      <div className="flex items-center">
                        {updateMessage.type === 'success' ? (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 mr-2" />
                        )}
                        <span className="font-medium">{updateMessage.text}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Complete and Cancel Only */}
                  <div className="pt-4">
                    <div className="flex space-x-4">
                      <button
                        onClick={handleCompleteAppointment}
                        disabled={isUpdatingStatus || selectedAppointment.status === 'completed'}
                        className={`flex-1 py-4 px-6 rounded-lg transition-colors flex items-center justify-center font-semibold text-lg ${
                          selectedAppointment.status === 'completed'
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : isUpdatingStatus
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25 transform hover:scale-105'
                        }`}
                      >
                        {isUpdatingStatus ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-6 h-6 mr-3" />
                            {selectedAppointment.status === 'completed' ? 'Already Completed' : 'Mark as Completed'}
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={handleCancelAppointment}
                        disabled={isUpdatingStatus || selectedAppointment.status === 'cancelled'}
                        className={`flex-1 py-4 px-6 rounded-lg transition-colors flex items-center justify-center font-semibold text-lg ${
                          selectedAppointment.status === 'cancelled'
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : isUpdatingStatus
                            ? 'bg-red-500 text-white cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25 transform hover:scale-105'
                        }`}
                      >
                        {isUpdatingStatus ? (
                          <>
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <X className="w-6 h-6 mr-3" />
                            {selectedAppointment.status === 'cancelled' ? 'Already Cancelled' : 'Cancel Appointment'}
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Status Information */}
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <p className="text-sm text-blue-200 text-center">
                        <strong>Complete:</strong> Moves client to attended appointments • 
                        <strong> Cancel:</strong> Moves client to cancelled appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
