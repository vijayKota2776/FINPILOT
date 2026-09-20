import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Company } from '../models/Company.js';
import { CompanyMember } from '../models/CompanyMember.js';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finpilot';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Company.deleteMany();
    await CompanyMember.deleteMany();
    
    console.log('Cleared existing data');

    // Create user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'Demo Admin',
      email: 'demo@finpilot.io',
      passwordHash,
      emailVerified: true
    });

    // Create Company
    const company = await Company.create({
      legalName: 'Acme Corp Pvt Ltd',
      displayName: 'Acme Corp',
      businessType: 'LLC',
      country: 'India',
      industry: 'Technology',
      kycStatus: 'VERIFIED',
      authorizedRepresentativeUserId: user._id,
      createdBy: user._id
    });

    // Add User to Company as MASTER_ADMIN
    await CompanyMember.create({
      companyId: company._id,
      userId: user._id,
      role: 'MASTER_ADMIN',
      status: 'ACTIVE'
    });

    console.log('✅ Seed complete! You can log in with: demo@finpilot.io / password123');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
