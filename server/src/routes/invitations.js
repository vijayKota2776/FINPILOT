import express from 'express';
import crypto from 'crypto';
import { Invitation } from '../models/Invitation.js';
import { CompanyMember } from '../models/CompanyMember.js';
import { AuditLog } from '../models/AuditLog.js';
import { authenticateUser } from '../middleware/auth.js';
import mongoose from 'mongoose';
import { requireWorkspaceMember, requirePermission } from '../middleware/authorization.js';
import { sendWorkspaceInvitation } from '../services/email.service.js';

const router = express.Router({ mergeParams: true }); // Allows accessing :companyId from parent router

// @route   POST /api/companies/:companyId/invitations
// @desc    Invite a user to the workspace
router.post('/', authenticateUser, requireWorkspaceMember, requirePermission('invite_users'), async (req, res) => {
  try {
    const { companyId } = req.params;
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ success: false, error: { message: 'Email and role are required' } });
    }

    // Check seat limits
    const currentMembers = await CompanyMember.countDocuments({ companyId, status: 'ACTIVE' });
    const pendingInvites = await Invitation.countDocuments({ companyId, status: 'PENDING' });
    
    // Hardcoded limit of 4 for starter plan
    if (currentMembers + pendingInvites >= 4) {
      return res.status(400).json({ success: false, error: { message: 'Seat limit reached for your plan' } });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Set expiry to 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await Invitation.create({
      companyId,
      email,
      role,
      tokenHash,
      expiresAt,
      invitedBy: req.user._id
    });

    await AuditLog.create({
      companyId,
      userId: req.user._id,
      action: 'USER_INVITED',
      metadata: { email, role }
    });

    // Fetch company to get name
    const company = await mongoose.model('Company').findById(companyId);

    // In a real app, send an email with the unhashed `token` here
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const joinUrl = `${clientUrl}/join/${token}`;
    
    await sendWorkspaceInvitation(
      email,
      company ? company.name : 'A Workspace',
      req.user.name,
      joinUrl
    );

    res.status(201).json({ success: true, data: invitation });
  } catch (error) {
    console.error('Invite error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
});

export default router;
