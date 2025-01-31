import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true, enum: ['School', 'Clinic', 'Home'] },
  approvedHours: { type: Number, required: true },
  availability: {
    Mon: { startTime: String, endTime: String },
    Tue: { startTime: String, endTime: String },
    Wed: { startTime: String, endTime: String },
    Thu: { startTime: String, endTime: String },
    Fri: { startTime: String, endTime: String },
    Sat: { startTime: String, endTime: String },
    Sun: { startTime: String, endTime: String },
  },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
