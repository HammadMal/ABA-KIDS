import express from 'express';
import Patient from '../models/Patient.js';

const router = express.Router();

// Add Patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send({ message: 'Patient added successfully', patient });
  } catch (error) {
    res.status(400).send({ message: 'Failed to add patient', error });
  }
});

// Get All Patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch patients', error });
  }
});

// Delete Patient by ID
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }
    res.status(200).send({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete patient', error });
  }
});

export default router;
