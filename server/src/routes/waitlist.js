import express from 'express';
import { WaitlistUser } from '../models/WaitlistUser.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, company, role, companySize, automationInterest } = req.body;
    
    // Check if user already exists
    const existingUser = await WaitlistUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'You are already on the waitlist!' });
    }

    // Add to MongoDB
    const newUser = await WaitlistUser.create({
      name,
      email,
      company,
      role,
      companySize,
      automationInterest,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Successfully added to waitlist', id: newUser._id });
  } catch (error) {
    console.error('Error adding to waitlist: ', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

export default router;
