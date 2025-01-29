import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Add Doctor
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    res.status(400).send({ message: 'Failed to add doctor', error });
  }
});

// Get All Doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch doctors
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
});

// Delete Doctor by ID
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    res.status(200).send({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete doctor', error });
  }
});

export default router;
