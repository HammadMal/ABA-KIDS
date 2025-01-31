import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true, enum: ['RBT', 'BT', 'BCBA'] },
  colorCoding: { type: String, required: true },
  availability: {
    Mon: { startTime: String, endTime: String },
    Tue: { startTime: String, endTime: String },
    Wed: { startTime: String, endTime: String },
    Thu: { startTime: String, endTime: String },
    Fri: { startTime: String, endTime: String },
    Sat: { startTime: String, endTime: String },
    Sun: { startTime: String, endTime: String },
  },
  nonbillable: { type: Boolean, default: false },
  priority: { type: Boolean, default: false },
  fullTime: { type: Boolean, default: true },
  maxHoursPerWeek: { type: Number, default: null }, // Only for part-time doctors
});

const Doctor = mongoose.model('Doctor', doctorSchema);


export default Doctor;
