"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Phone, MessageSquare, ChevronLeft, ChevronRight, Check } from "lucide-react"

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  image: string
  available: boolean
}

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Aisha Sharma",
    specialty: "Ayurvedic Practitioner",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Raj Patel",
    specialty: "Holistic Nutritionist",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Maya Singh",
    specialty: "Ayurvedic Herbalist",
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
    available: false,
  },
  {
    id: 4,
    name: "Dr. Vikram Mehta",
    specialty: "Wellness Coach",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
    available: true,
  },
]

const timeSlots: TimeSlot[] = [
  { id: 1, time: "9:00 AM", available: true },
  { id: 2, time: "10:00 AM", available: true },
  { id: 3, time: "11:00 AM", available: false },
  { id: 4, time: "1:00 PM", available: true },
  { id: 5, time: "2:00 PM", available: true },
  { id: 6, time: "3:00 PM", available: false },
  { id: 7, time: "4:00 PM", available: true },
  { id: 8, time: "5:00 PM", available: true },
]

export default function ConsultationBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null)
  const [consultationType, setConsultationType] = useState<string>("video")
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = new Date().toDateString() === date.toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isDisabled = isPast || isWeekend

      days.push(
        <button
          key={day}
          disabled={isDisabled}
          onClick={() => !isDisabled && setSelectedDate(date)}
          className={`
            calendar-day h-10 w-10 rounded-full flex items-center justify-center text-sm
            ${isToday ? "border border-green-500" : ""}
            ${isSelected ? "calendar-day-selected" : ""}
            ${isDisabled ? "calendar-day-disabled" : ""}
          `}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const confirmBooking = () => {
    setBookingConfirmed(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="health-card border-green-500/30 bg-black/40 lg:col-span-2">
        <CardHeader>
          <CardTitle>Select Consultation Details</CardTitle>
        </CardHeader>
        <CardContent>
          {bookingConfirmed ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-gray-400 mb-6 text-center">
                Your consultation has been scheduled successfully. You will receive a confirmation email shortly.
              </p>
              <div className="bg-black/40 rounded-lg p-4 w-full max-w-md border border-green-500/30">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <img src={doctors.find((d) => d.id === selectedDoctor)?.image || "/placeholder.svg"} alt="Doctor" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{doctors.find((d) => d.id === selectedDoctor)?.name}</h3>
                    <p className="text-sm text-gray-400">{doctors.find((d) => d.id === selectedDoctor)?.specialty}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">
                      {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{timeSlots.find((t) => t.id === selectedTimeSlot)?.time}</span>
                  </div>
                  <div className="flex items-center">
                    {consultationType === "video" ? (
                      <Video className="h-4 w-4 mr-2 text-green-500" />
                    ) : consultationType === "phone" ? (
                      <Phone className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    <span className="text-sm capitalize">{consultationType} Consultation</span>
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-green-500 hover:bg-green-600" onClick={() => setBookingConfirmed(false)}>
                Book Another Consultation
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Choose a Specialist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`
                        p-4 rounded-lg border cursor-pointer transition-all
                        ${selectedDoctor === doctor.id ? "border-green-500 bg-green-500/10" : "border-green-500/30 bg-black/40"}
                        ${!doctor.available ? "opacity-50" : ""}
                      `}
                      onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-gray-400">{doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(doctor.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-400 ml-1">{doctor.rating}</span>
                          </div>
                        </div>
                        {!doctor.available && <Badge className="ml-auto bg-gray-500">Unavailable</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Select Date</h3>
                <div className="bg-black/40 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h4 className="font-medium">
                      {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h4>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-xs font-medium text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 justify-items-center">{renderCalendar()}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Select Time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                      className={`
                        p-3 rounded-lg border text-center transition-all
                        ${selectedTimeSlot === slot.id ? "border-green-500 bg-green-500/10" : "border-green-500/30 bg-black/40"}
                        ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Consultation Type</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setConsultationType("video")}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${consultationType === "video" ? "border-green-500 bg-green-500/10" : "border-green-500/30 bg-black/40"}
                    `}
                  >
                    <Video className="h-5 w-5" />
                    <span>Video Call</span>
                  </button>
                  <button
                    onClick={() => setConsultationType("phone")}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${consultationType === "phone" ? "border-green-500 bg-green-500/10" : "border-green-500/30 bg-black/40"}
                    `}
                  >
                    <Phone className="h-5 w-5" />
                    <span>Phone Call</span>
                  </button>
                  <button
                    onClick={() => setConsultationType("chat")}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${consultationType === "chat" ? "border-green-500 bg-green-500/10" : "border-green-500/30 bg-black/40"}
                    `}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="health-card border-green-500/30 bg-black/40">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDoctor ? (
            <div className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <img src={doctors.find((d) => d.id === selectedDoctor)?.image || "/placeholder.svg"} alt="Doctor" />
                </Avatar>
                <div>
                  <h3 className="font-medium">{doctors.find((d) => d.id === selectedDoctor)?.name}</h3>
                  <p className="text-sm text-gray-400">{doctors.find((d) => d.id === selectedDoctor)?.specialty}</p>
                </div>
              </div>

              {selectedDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </span>
                </div>
              )}

              {selectedTimeSlot && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">{timeSlots.find((t) => t.id === selectedTimeSlot)?.time}</span>
                </div>
              )}

              <div className="flex items-center">
                {consultationType === "video" ? (
                  <Video className="h-4 w-4 mr-2 text-green-500" />
                ) : consultationType === "phone" ? (
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
                )}
                <span className="text-sm capitalize">{consultationType} Consultation</span>
              </div>

              <div className="pt-4 border-t border-green-500/30">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Consultation Fee</span>
                  <span>$75.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Health Plan Discount</span>
                  <span className="text-green-500">-$25.00</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-green-500/30">
                  <span>Total</span>
                  <span>$50.00</span>
                </div>
              </div>

              <Button
                className="w-full mt-4 bg-green-500 hover:bg-green-600"
                disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot}
                onClick={confirmBooking}
              >
                Confirm Booking
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a specialist to see booking details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

