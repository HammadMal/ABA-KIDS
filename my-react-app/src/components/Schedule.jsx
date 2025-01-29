import React, { useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

const doctors = [
  {
    _id: "6798eea86a0b3cd5f3862626",
    name: "Test Doctor",
    position: "BT",
    colorCoding: "#b80505",
    availability: "Mon-Tue",
    startTime: "07:30",
    endTime: "16:50",
    nonbillable: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862629",
    name: "Test Doctor 2",
    position: "BT",
    colorCoding: "#000000",
    availability: "Mon-Tue",
    startTime: "07:30",
    endTime: "13:00",
    nonbillable: false
  },
  {
    _id: "6798eeb96a0b3cd5f3862630",
    name: "Test Doctor 3",
    position: "BCBA",
    colorCoding: "#00ff00",
    availability: "Mon-Tue",
    startTime: "08:00",
    endTime: "15:00",
    nonbillable: false
  },
  {
    _id: "6798eeb96a0b3cd5f3862631",
    name: "Test Doctor 4",
    position: "BT",
    colorCoding: "#ff9900",
    availability: "Tue-Fri",
    startTime: "09:00",
    endTime: "14:00",
    nonbillable: true
  },
  {
    _id: "6798eeb96a0b3cd5f3862632",
    name: "Test Doctor 5",
    position: "BCBA",
    colorCoding: "#3366cc",
    availability: "Mon-Fri",
    startTime: "08:30",
    endTime: "17:00",
    nonbillable: false
  }
];

const patients = [
  {
    _id: "6798eed46a0b3cd5f386262e",
    name: "Patient 1",
    location: "School",
    availability: "Mon-Tue"
  },
  {
    _id: "6798eedf6a0b3cd5f3862631",
    name: "Patient 2",
    location: "Clinic",
    availability: "Mon-Wed"
  },
  {
    _id: "6798eedf6a0b3cd5f3862632",
    name: "Patient 3",
    location: "Home",
    availability: "Wed-Fri"
  },
  {
    _id: "6798eedf6a0b3cd5f3862633",
    name: "Patient 4",
    location: "Clinic",
    availability: "Tue-Thu"
  },
  {
    _id: "6798eedf6a0b3cd5f3862634",
    name: "Patient 5",
    location: "School",
    availability: "Mon-Fri"
  }
];

const Schedule = () => {
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const matchDoctorsWithPatients = () => {
    const schedule = [];
    const assignedDoctors = new Set(); // To track assigned doctors

    patients.forEach((patient) => {
      const availableDoctors = doctors.filter((doctor) => {
        // Match availability days
        const doctorDays = doctor.availability.split('-');
        const patientDays = patient.availability.split('-');
        const daysOverlap = patientDays.some((day) => doctorDays.includes(day));

        // Check start and end time compatibility
        const doctorStart = parseInt(doctor.startTime.replace(':', ''), 10);
        const doctorEnd = parseInt(doctor.endTime.replace(':', ''), 10);
        const patientMaxSession = 3 * 100; // Max session duration: 3 hours (in HHMM format)

        return (
          daysOverlap &&
          doctorStart + patientMaxSession <= doctorEnd &&
          !assignedDoctors.has(doctor._id) // Ensure doctor is not already assigned
        );
      });

      // Randomly select a doctor from the filtered list
      const assignedDoctor = availableDoctors.length > 0
        ? availableDoctors[Math.floor(Math.random() * availableDoctors.length)]
        : null;

      if (assignedDoctor) {
        assignedDoctors.add(assignedDoctor._id); // Mark doctor as assigned
        patient.availability.split('-').forEach((day) => {
          const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
          if (dayIndex !== -1) {
            schedule.push({
              Id: assignedDoctor._id,
              Subject: `${assignedDoctor.name} with ${patient.name}`,
              StartTime: new Date(2023, 0, dayIndex + 1, parseInt(assignedDoctor.startTime.split(':')[0]), parseInt(assignedDoctor.startTime.split(':')[1])),
              EndTime: new Date(2023, 0, dayIndex + 1, parseInt(assignedDoctor.endTime.split(':')[0]), parseInt(assignedDoctor.endTime.split(':')[1])),
              IsAllDay: false
            });
          }
        });
      }
    });

    setGeneratedSchedule(schedule);
  };

  // Filtered schedule based on the selected doctor
  const filteredSchedule = selectedDoctor === "all"
    ? generatedSchedule
    : generatedSchedule.filter((event) => event.Id === selectedDoctor);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Weekly Schedule</h1>

      <button
        onClick={matchDoctorsWithPatients}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-6"
      >
        Generate Schedule
      </button>

      {/* Dropdown for filtering by doctor */}
      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
        className="mb-6 p-2 border rounded"
      >
        <option value="all">All Doctors</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <ScheduleComponent
        height="650px"
        selectedDate={new Date(2023, 0, 1)}
        eventSettings={{ dataSource: filteredSchedule }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Schedule;
