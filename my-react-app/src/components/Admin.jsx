import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';

const AdminPortal = () => {

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctors');
      console.log("Fetched doctors:", response.data); // Debug log

      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
    }
  };
  
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addDoctor = async (doctorData) => {
    console.log("Payload being sent to backend:", doctorData); // Debugging
  
    try {
      await axios.post('http://localhost:5000/doctors', doctorData);
      fetchDoctors(); // Refresh the list
      alert('Doctor added successfully!');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };
  
  const addPatient = async (patientData) => {
    try {
      await axios.post('http://localhost:5000/patients', patientData);
      fetchPatients(); // Refresh the list
      alert('Patient added successfully!');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };
  
  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctors/${id}`);
      fetchDoctors(); // Refresh the list
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };
  
  const deletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      fetchPatients(); // Refresh the list
      alert('Patient deleted successfully!');
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };
  
  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const doctorData = Object.fromEntries(formData.entries());
  
    // Convert checkbox to Boolean
    doctorData.nonbillable = formData.get('nonbillable') === 'on';
  
    console.log("Doctor data being sent:", doctorData); // Debugging
    addDoctor(doctorData);
  };
  
  
  const handlePatientSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientData = Object.fromEntries(formData.entries());
    addPatient(patientData);
  };
  

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);



  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [doctorSubTab, setDoctorSubTab] = useState('');
  const [patientSubTab, setPatientSubTab] = useState('');

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  // Hardcoded login credentials
  const hardcodedEmail = "abbas@gmail.com";
  const hardcodedPassword = "1234";

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedEmail && password === hardcodedPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  const renderLoginForm = () => (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 relative">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-300 rounded-full opacity-20"></div>
      <div className="mt-6">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-10">Welcome Back!</h1>
      </div>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-transform transform hover:scale-105"
        >
          Sign In
        </button>
      </form>
    </div>
  );

  const renderDoctorTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Doctor Options</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setDoctorSubTab('Add')}
          className={`py-2 px-4 rounded-lg font-medium ${
            doctorSubTab === 'Add'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Add Doctor
        </button>
        <button
          onClick={() => setDoctorSubTab('Delete')}
          className={`py-2 px-4 rounded-lg font-medium ${
            doctorSubTab === 'Delete'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Delete Doctor
        </button>
      </div>
      {doctorSubTab === 'Add' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700">Add Doctor</h3>
          <form onSubmit={handleDoctorSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Doctor Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Position</label>
              <select
                name="position"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="RBT">RBT</option>
                <option value="BT">BT</option>
                <option value="BCBA">BCBA</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Color Coding</label>
              <input
                name="colorCoding"
                type="color"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Availability (M-Sat)</label>
              <input
                name="availability"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Mon-Fri"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Start Time - End Time</label>
              <div className="flex gap-2">
                <input
                  name="startTime"
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  name="endTime"
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  name="nonbillable"
                  type="checkbox"
                  className="mr-2"
                />
                Nonbillable Hours
              </label>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      )}
      {doctorSubTab === 'Delete' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700">Delete Doctor</h3>
          <ul className="space-y-3">
            {Array.isArray(doctors) &&
              doctors.map((doctor) => (
                <li
                  key={doctor._id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
                >
                  {/* Render specific properties of the doctor */}
                  <span className="text-gray-800">{`${doctor.name} - ${doctor.position}`}</span>
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
  

  const renderPatientTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Patient Options</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPatientSubTab('Add')}
          className={`py-2 px-4 rounded-lg font-medium ${
            patientSubTab === 'Add'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Add Patient
        </button>
        <button
          onClick={() => setPatientSubTab('Delete')}
          className={`py-2 px-4 rounded-lg font-medium ${
            patientSubTab === 'Delete'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Delete Patient
        </button>
      </div>
      {patientSubTab === 'Add' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700">Add Patient</h3>
          <form onSubmit={handlePatientSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Patient Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Location</label>
              <select
                name="location"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="School">School</option>
                <option value="Clinic">Clinic</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Availability</label>
              <input
                name="availability"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., Mon-Fri"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
            >
              Save
            </button>
          </form>
        </div>
      )}
      {patientSubTab === 'Delete' && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-700">Delete Patient</h3>
          <ul className="space-y-3">
            {Array.isArray(patients) &&
              patients.map((patient) => (
                <li
                  key={patient._id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
                >
                  {/* Render specific properties of the patient */}
                  <span className="text-gray-800">{`${patient.name} - ${patient.location}`}</span>
                  <button
                    onClick={() => deletePatient(patient._id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
  

  const renderAdminPanel = () => (

  
    <div className="w-full h-screen flex flex-col items-center bg-blue p-10">
      <h1 className="text-4xl font-extrabold mb-8 text-white">Admin Portal</h1>
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setActiveTab('Doctor')}
          className={`py-2 px-6 rounded-lg font-medium text-sm ${
            activeTab === 'Doctor'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Doctor
        </button>
        <button
          onClick={() => setActiveTab('Patient')}
          className={`py-2 px-6 rounded-lg font-medium text-sm ${
            activeTab === 'Patient'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Patient
        </button>
        <button
          onClick={() => setActiveTab('Schedule')}
          className={`py-2 px-6 rounded-lg font-medium text-sm ${
            activeTab === 'Schedule'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          Schedule
        </button>
      </div>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'Doctor' && renderDoctorTab()}
        {activeTab === 'Patient' && renderPatientTab()}
        {activeTab === 'Schedule' && (
          <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Schedule</h2>
          <button
            onClick={() => navigate('/schedule')} // Route to Schedule component
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Generate Schedule
          </button>
        </div>
        )}
      </div>
    </div>
  );

  return isLoggedIn ? renderAdminPanel() : renderLoginForm();
};

export default AdminPortal;