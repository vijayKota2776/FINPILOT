import express from 'express';
import { Company } from '../models/Company.js';
import { CompanyMember } from '../models/CompanyMember.js';
import { AuditLog } from '../models/AuditLog.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireWorkspaceMember } from '../middleware/authorization.js';
import invitationRoutes from './invitations.js';

const router = express.Router();

router.use('/:companyId/invitations', invitationRoutes);

// @route   POST /api/companies
// @desc    Create a new company
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { legalName, displayName, businessType, registrationNumber, country, industry } = req.body;

    if (!legalName) {
      return res.status(400).json({ success: false, error: { message: 'Legal name is required' } });
    }

    // Create Company
    const company = await Company.create({
      legalName,
      displayName: displayName || legalName,
      businessType,
      registrationNumber,
      country,
      industry,
      createdBy: req.user._id
    });

    // Automatically make creator an active member (but NOT Master Admin yet, KYC pending)
    await CompanyMember.create({
      companyId: company._id,
      userId: req.user._id,
      role: 'FINANCE_ADMIN', // Placeholder role until verified
      status: 'ACTIVE'
    });

    await AuditLog.create({
      companyId: company._id,
      userId: req.user._id,
      action: 'COMPANY_CREATED',
      resource: 'Company',
      resourceId: company._id
    });

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    console.error('Company creation error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

// @route   GET /api/companies/my
// @desc    Get all companies the user belongs to
router.get('/my', authenticateUser, async (req, res) => {
  try {
    const memberships = await CompanyMember.find({ 
      userId: req.user._id, 
      status: 'ACTIVE' 
    }).populate('companyId');

    const companies = memberships.map(m => ({
      ...m.companyId.toObject(),
      myRole: m.role
    }));

    res.json({ success: true, data: companies });
  } catch (error) {
    console.error('Fetch my companies error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

// @route   GET /api/companies/:companyId
// @desc    Get single company details
router.get('/:companyId', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) {
      return res.status(404).json({ success: false, error: { message: 'Company not found' } });
    }
    res.json({ success: true, data: company });
  } catch (error) {
    console.error('Fetch company error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

// @route   POST /api/companies/:companyId/simulate-kyc
// @desc    Simulate KYC approval to grant MASTER_ADMIN
router.post('/:companyId/simulate-kyc', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const companyId = req.params.companyId;
    
    // Update company KYC status
    const company = await Company.findByIdAndUpdate(companyId, {
      kycStatus: 'VERIFIED',
      kycVerifiedAt: new Date(),
      authorizedRepresentativeUserId: req.user._id
    }, { new: true });

    // Upgrade the current user's role to MASTER_ADMIN
    await CompanyMember.findOneAndUpdate(
      { companyId, userId: req.user._id },
      { role: 'MASTER_ADMIN' }
    );

    await AuditLog.create({
      companyId: companyId,
      userId: req.user._id,
      action: 'KYC_VERIFIED',
      metadata: { representative: req.user._id }
    });

    res.json({ success: true, data: company });
  } catch (error) {
    console.error('KYC simulation error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

export default router;
