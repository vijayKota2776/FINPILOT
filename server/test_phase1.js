import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/User.js';
import { Company } from './src/models/Company.js';

dotenv.config();

async function testPhase1() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/finpilot';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Successfully connected to MongoDB!');
    
    console.log('✅ Mongoose Models loaded successfully (User, Company, etc.)');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected gracefully.');
  } catch (error) {
    console.error('❌ Error during Phase 1 testing:', error);
  }
}

testPhase1();
