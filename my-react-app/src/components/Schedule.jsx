import React, { useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject,ViewsDirective,ViewDirective } from '@syncfusion/ej2-react-schedule';

const doctors = [
  {
    _id: "6798eea86a0b3cd5f3862626",
    name: "Test Doctor 1",
    position: "BT",
    colorCoding: "#b80505",
    availability: {
      Mon: { startTime: "07:30", endTime: "16:50" },
      Tue: { startTime: "07:30", endTime: "16:50" },
      Wed: { startTime: "07:30", endTime: "16:50" },
      Thu: { startTime: "07:30", endTime: "16:50" },
      Fri: { startTime: "07:30", endTime: "16:50" },
      Sat: null,
      Sun: null
    },
    nonbillable: true,
    fullTime: true,
    priority: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862629",
    name: "Test Doctor 2",
    position: "BT",
    colorCoding: "#000000",
    availability: {
      Mon: { startTime: "07:30", endTime: "13:00" },
      Tue: { startTime: "07:30", endTime: "13:00" },
      Wed: null,
      Thu: { startTime: "07:30", endTime: "13:00" },
      Fri: { startTime: "07:30", endTime: "13:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: false,
    fullTime: false,
    maxHoursPerWeek: 20
  },
  {
    _id: "6798eeb96a0b3cd5f3862630",
    name: "Test Doctor 3",
    position: "BCBA",
    colorCoding: "#00ff00",
    availability: {
      Mon: { startTime: "08:00", endTime: "15:00" },
      Tue: { startTime: "08:00", endTime: "15:00" },
      Wed: { startTime: "08:00", endTime: "15:00" },
      Thu: { startTime: "08:00", endTime: "15:00" },
      Fri: { startTime: "08:00", endTime: "15:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: false,
    fullTime: true,
    priority: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862631",
    name: "Test Doctor 4",
    position: "BT",
    colorCoding: "#ff9900",
    availability: {
      Mon: null,
      Tue: { startTime: "09:00", endTime: "14:00" },
      Wed: { startTime: "09:00", endTime: "14:00" },
      Thu: { startTime: "09:00", endTime: "14:00" },
      Fri: { startTime: "09:00", endTime: "14:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: true,
    fullTime: false,
    maxHoursPerWeek: 20
  },
  {
    _id: "6798eeb96a0b3cd5f3862632",
    name: "Test Doctor 5",
    position: "BCBA",
    colorCoding: "#3366cc",
    availability: {
      Mon: { startTime: "08:30", endTime: "17:00" },
      Tue: { startTime: "08:30", endTime: "17:00" },
      Wed: { startTime: "08:30", endTime: "17:00" },
      Thu: { startTime: "08:30", endTime: "17:00" },
      Fri: { startTime: "08:30", endTime: "17:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: false,
    fullTime: true,
    priority: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862633",
    name: "Test Doctor 6",
    position: "BT",
    colorCoding: "#ff6600",
    availability: {
      Mon: { startTime: "07:30", endTime: "16:50" },
      Tue: { startTime: "07:30", endTime: "16:50" },
      Wed: { startTime: "07:30", endTime: "16:50" },
      Thu: { startTime: "07:30", endTime: "16:50" },
      Fri: { startTime: "07:30", endTime: "16:50" },
      Sat: null,
      Sun: null
    },
    nonbillable: false,
    fullTime: true,
    priority: false
  },
  {
    _id: "6798eeb96a0b3cd5f3862634",
    name: "Test Doctor 7",
    position: "BCBA",
    colorCoding: "#ff3366",
    availability: {
      Mon: { startTime: "08:30", endTime: "17:00" },
      Tue: { startTime: "08:30", endTime: "17:00" },
      Wed: { startTime: "08:30", endTime: "17:00" },
      Thu: { startTime: "08:30", endTime: "17:00" },
      Fri: { startTime: "08:30", endTime: "17:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: false,
    fullTime: true,
    priority: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862635",
    name: "Test Doctor 8",
    position: "BT",
    colorCoding: "#9933ff",
    availability: {
      Mon: { startTime: "10:00", endTime: "14:00" },
      Tue: { startTime: "10:00", endTime: "14:00" },
      Wed: { startTime: "10:00", endTime: "14:00" },
      Thu: { startTime: "10:00", endTime: "14:00" },
      Fri: { startTime: "10:00", endTime: "14:00" },
      Sat: null,
      Sun: null
    },
    nonbillable: true,
    fullTime: false,
    maxHoursPerWeek: 15
  }
];


const patients = [
  {
    _id: "6798eed46a0b3cd5f386262e",
    name: "Patient 1",
    location: "School",
    approvedHours: 6,
    availability: {
      Mon: { startTime: "08:00", endTime: "12:00" },
      Tue: { startTime: "08:00", endTime: "12:00" },
      Wed: null,
      Thu: null,
      Fri: { startTime: "08:00", endTime: "12:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862631",
    name: "Patient 2",
    location: "Clinic",
    approvedHours: 8,
    availability: {
      Mon: { startTime: "10:00", endTime: "14:00" },
      Tue: { startTime: "10:00", endTime: "14:00" },
      Wed: { startTime: "10:00", endTime: "14:00" },
      Thu: null,
      Fri: { startTime: "10:00", endTime: "14:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862632",
    name: "Patient 3",
    location: "Home",
    approvedHours: 4,
    availability: {
      Mon: null,
      Tue: { startTime: "14:00", endTime: "18:00" },
      Wed: { startTime: "14:00", endTime: "18:00" },
      Thu: { startTime: "14:00", endTime: "18:00" },
      Fri: { startTime: "14:00", endTime: "18:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862633",
    name: "Patient 4",
    location: "Clinic",
    approvedHours: 10,
    availability: {
      Mon: { startTime: "09:00", endTime: "13:00" },
      Tue: { startTime: "09:00", endTime: "13:00" },
      Wed: { startTime: "09:00", endTime: "13:00" },
      Thu: null,
      Fri: { startTime: "09:00", endTime: "13:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862634",
    name: "Patient 5",
    location: "School",
    approvedHours: 12,
    availability: {
      Mon: { startTime: "08:00", endTime: "12:00" },
      Tue: { startTime: "08:00", endTime: "12:00" },
      Wed: { startTime: "08:00", endTime: "12:00" },
      Thu: { startTime: "08:00", endTime: "12:00" },
      Fri: { startTime: "08:00", endTime: "12:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862635",
    name: "Patient 6",
    location: "Clinic",
    approvedHours: 5,
    availability: {
      Mon: { startTime: "14:00", endTime: "19:00" },
      Tue: { startTime: "14:00", endTime: "19:00" },
      Wed: { startTime: "14:00", endTime: "19:00" },
      Thu: null,
      Fri: { startTime: "14:00", endTime: "19:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862636",
    name: "Patient 7",
    location: "Home",
    approvedHours: 6,
    availability: {
      Mon: { startTime: "09:00", endTime: "15:00" },
      Tue: { startTime: "09:00", endTime: "15:00" },
      Wed: { startTime: "09:00", endTime: "15:00" },
      Thu: { startTime: "09:00", endTime: "15:00" },
      Fri: { startTime: "09:00", endTime: "15:00" },
      Sat: null,
      Sun: null
    }
  },
  {
    _id: "6798eedf6a0b3cd5f3862637",
    name: "Patient 8",
    location: "School",
    approvedHours: 7,
    availability: {
      Mon: { startTime: "08:00", endTime: "14:00" },
      Tue: { startTime: "08:00", endTime: "14:00" },
      Wed: { startTime: "08:00", endTime: "14:00" },
      Thu: { startTime: "08:00", endTime: "14:00" },
      Fri: { startTime: "08:00", endTime: "14:00" },
      Sat: null,
      Sun: null
    }
  }
];

const Schedule = () => {
  const [pairings, setPairings] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [debug, setDebug] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');






  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const matchDoctorsWithPatients = () => {
    const newPairings = [];
    const newDebug = [];
    const doctorAssignments = {};
    
    doctors.forEach(doc => {
      doctorAssignments[doc._id] = {
        totalHours: 0,
        slots: {
          Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
        }
      };
    });

    const isDoctorAvailable = (doctorId, day, startTime, endTime) => {
      const slots = doctorAssignments[doctorId].slots[day];
      const newStart = timeToMinutes(startTime);
      const newEnd = timeToMinutes(endTime);
      return !slots.some(slot => {
        const slotStart = timeToMinutes(slot.startTime);
        const slotEnd = timeToMinutes(slot.endTime);
        return (newStart < slotEnd && slotStart < newEnd);
      });
    };

    const sortedPatients = [...patients].sort((a, b) => b.approvedHours - a.approvedHours);

    sortedPatients.forEach(patient => {
      let remainingHours = patient.approvedHours;
      newDebug.push(`Processing ${patient.name} - Needs ${remainingHours} hours`);

      // Priority full-time doctors
      const priorityDoctors = doctors.filter(d => d.fullTime && d.priority);
      for (const doctor of priorityDoctors) {
        if (remainingHours <= 0) break;

        Object.entries(patient.availability).forEach(([day, patientSlot]) => {
          if (!patientSlot || !doctor.availability[day] || remainingHours <= 0) return;

          const doctorSlot = doctor.availability[day];
          const patientStartMins = timeToMinutes(patientSlot.startTime);
          const patientEndMins = timeToMinutes(patientSlot.endTime);
          const doctorStartMins = timeToMinutes(doctorSlot.startTime);
          const doctorEndMins = timeToMinutes(doctorSlot.endTime);

          const overlapStart = Math.max(patientStartMins, doctorStartMins);
          const overlapEnd = Math.min(patientEndMins, doctorEndMins);

          if (overlapEnd > overlapStart && isDoctorAvailable(doctor._id, day, minutesToTime(overlapStart), minutesToTime(overlapEnd))) {
            const availableHours = Math.floor((overlapEnd - overlapStart) / 60);
            const hoursToAssign = Math.min(availableHours, remainingHours);

            if (hoursToAssign > 0) {
              const assignedEndMins = overlapStart + (hoursToAssign * 60);
              
              doctorAssignments[doctor._id].slots[day].push({
                startTime: minutesToTime(overlapStart),
                endTime: minutesToTime(assignedEndMins),
                hours: hoursToAssign
              });

              newPairings.push({
                doctor: doctor.name,
                patient: patient.name,
                day,
                hours: hoursToAssign,
                startTime: minutesToTime(overlapStart),
                endTime: minutesToTime(assignedEndMins)
              });

              remainingHours -= hoursToAssign;
              newDebug.push(`Paired ${doctor.name} with ${patient.name} for ${hoursToAssign} hours on ${day}`);
            }
          }
        });
      }

      // Part-time doctors
      if (remainingHours > 0) {
        const partTimeDoctors = doctors.filter(d => !d.fullTime);
        for (const doctor of partTimeDoctors) {
          if (remainingHours <= 0) break;

          const availableWeeklyHours = doctor.maxHoursPerWeek - doctorAssignments[doctor._id].totalHours;
          if (availableWeeklyHours <= 0) continue;

          Object.entries(patient.availability).forEach(([day, patientSlot]) => {
            if (!patientSlot || !doctor.availability[day] || remainingHours <= 0) return;

            const doctorSlot = doctor.availability[day];
            const patientStartMins = timeToMinutes(patientSlot.startTime);
            const patientEndMins = timeToMinutes(patientSlot.endTime);
            const doctorStartMins = timeToMinutes(doctorSlot.startTime);
            const doctorEndMins = timeToMinutes(doctorSlot.endTime);

            const overlapStart = Math.max(patientStartMins, doctorStartMins);
            const overlapEnd = Math.min(patientEndMins, doctorEndMins);

            if (overlapEnd > overlapStart && isDoctorAvailable(doctor._id, day, minutesToTime(overlapStart), minutesToTime(overlapEnd))) {
              const availableHours = Math.min(
                Math.floor((overlapEnd - overlapStart) / 60),
                availableWeeklyHours
              );
              const hoursToAssign = Math.min(availableHours, remainingHours);

              if (hoursToAssign > 0) {
                const assignedEndMins = overlapStart + (hoursToAssign * 60);

                doctorAssignments[doctor._id].slots[day].push({
                  startTime: minutesToTime(overlapStart),
                  endTime: minutesToTime(assignedEndMins),
                  hours: hoursToAssign
                });
                doctorAssignments[doctor._id].totalHours += hoursToAssign;

                newPairings.push({
                  doctor: doctor.name,
                  patient: patient.name,
                  day,
                  hours: hoursToAssign,
                  startTime: minutesToTime(overlapStart),
                  endTime: minutesToTime(assignedEndMins)
                });

                remainingHours -= hoursToAssign;
                newDebug.push(`Paired ${doctor.name} with ${patient.name} for ${hoursToAssign} hours on ${day}`);
              }
            }
          });
        }
      }
    });

    // Convert pairings to schedule format
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    
    const scheduleEvents = newPairings.map(pair => {
      const dayOffset = {
        'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5
      }[pair.day];
      
      const eventDate = new Date(startOfWeek);
      eventDate.setDate(eventDate.getDate() + dayOffset);
      
      const [startHour, startMinute] = pair.startTime.split(':').map(Number);
      const [endHour, endMinute] = pair.endTime.split(':').map(Number);
      
      const startDateTime = new Date(eventDate);
      startDateTime.setHours(startHour, startMinute, 0);
      
      const endDateTime = new Date(eventDate);
      endDateTime.setHours(endHour, endMinute, 0);
      
      const doctor = doctors.find(d => d.name === pair.doctor);
      
      return {
        Subject: `${pair.patient} with ${pair.doctor}`,
        StartTime: startDateTime,
        EndTime: endDateTime,
        IsAllDay: false,
        CategoryColor: doctor?.colorCoding || '#1a73e8'
      };
    });

    setPairings(newPairings);
    setScheduleData(scheduleEvents);
    setDebug(newDebug);
  };

  const filteredScheduleData = selectedDoctor 
    ? scheduleData.filter(event => event.Subject.includes(selectedDoctor))
    : scheduleData;

  

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Doctor-Patient Schedule</h1>
  
        <div className="flex gap-4 mb-6">
          <button
            onClick={matchDoctorsWithPatients}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Generate Schedule
          </button>
  
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Doctors</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
  
        {filteredScheduleData.length > 0 && (
          <div className="bg-white rounded shadow p-4">
            <ScheduleComponent 
              height="650px"
              selectedDate={new Date()}
              eventSettings={{ 
                dataSource: filteredScheduleData,
                fields: {
                  subject: { name: 'Subject' },
                  startTime: { name: 'StartTime' },
                  endTime: { name: 'EndTime' },
                  isAllDay: { name: 'IsAllDay' }
                }
              }}
              readonly={true}
              workHours={{ highlight: true, start: '07:00', end: '18:00' }}
            >
              <ViewsDirective>
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Day' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek]} />
            </ScheduleComponent>
  
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Pairing Details</h2>
              <div className="space-y-2">
                {pairings
                  .filter(pair => !selectedDoctor || pair.doctor === selectedDoctor)
                  .map((pair, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <p>{pair.doctor} → {pair.patient}</p>
                    <p className="text-sm text-gray-600">
                      {pair.day}: {pair.startTime} - {pair.endTime} ({pair.hours}h)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Schedule;