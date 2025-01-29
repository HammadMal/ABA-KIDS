import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  colorCoding: { type: String, required: true },
  availability: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  nonbillable: { type: Boolean, required: true },
});


const Doctor = mongoose.model('Doctor', doctorSchema);


export default Doctor;
