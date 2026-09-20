import { CompanyMember } from '../models/CompanyMember.js';
import { hasPermission } from '../utils/permissions.js';

export const requireWorkspaceMember = async (req, res, next) => {
  try {
    // The companyId could be in params (e.g. /api/companies/:companyId/transactions) 
    // or in the body for POST requests.
    const companyId = req.params.companyId || req.body.companyId;

    if (!companyId) {
      return res.status(400).json({ success: false, error: { code: 'MISSING_COMPANY_ID', message: 'Company ID is required' } });
    }

    const membership = await CompanyMember.findOne({
      companyId: companyId,
      userId: req.user._id,
      status: 'ACTIVE'
    });

    if (!membership) {
      return res.status(403).json({ success: false, error: { code: 'ACCESS_DENIED', message: 'You do not have access to this workspace' } });
    }

    // Attach membership to request for downstream use
    req.membership = membership;
    next();
  } catch (error) {
    console.error('Authorization middleware error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error during authorization' } });
  }
};

export const requirePermission = (permissionName) => {
  return (req, res, next) => {
    if (!req.membership) {
      return res.status(500).json({ success: false, error: { message: 'Internal error: requireWorkspaceMember must be called before requirePermission' } });
    }

    if (!hasPermission(req.membership.role, permissionName)) {
      return res.status(403).json({ success: false, error: { code: 'INSUFFICIENT_PERMISSIONS', message: `You need the ${permissionName} permission to perform this action` } });
    }

    next();
  };
};
