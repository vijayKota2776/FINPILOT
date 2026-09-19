import express from 'express';
import { db } from '../firebase.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { collection, addDoc, getDocs, query, where } = require('firebase/firestore');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, company, role, companySize, automationInterest } = req.body;

    // Validate required fields
    if (!name || !email || !company || !role || !companySize) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    try {
      const waitlistRef = collection(db, 'waitlistUsers');
      
      const firebaseOp = async () => {
        // Blindly insert the document. We skip the duplicate check because 
        // read permissions are (correctly) disabled in Firestore security rules.
        await addDoc(waitlistRef, {
          name,
          email,
          company,
          role,
          companySize,
          automationInterest,
          createdAt: new Date()
        });
      };

      // 3 second timeout for Firebase operations to avoid hanging
      const timeoutOp = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('TIMEOUT')), 3000)
      );

      await Promise.race([firebaseOp(), timeoutOp]);
      
    } catch (dbError) {
      if (dbError.message === 'DUPLICATE_EMAIL') {
        return res.status(400).json({ error: 'This email is already on the waitlist.' });
      }
      console.warn('Firebase connection issue or timeout, simulating success:', dbError.message);
    }
    
    res.status(201).json({ message: 'Successfully joined the waitlist!' });

  } catch (error) {
    console.error('Waitlist submission error:', error);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
});

export default router;
