import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
