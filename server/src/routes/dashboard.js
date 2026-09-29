import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { requireWorkspaceMember } from '../middleware/authorization.js';
import { getDashboardData } from '../services/dashboard.service.js';

const router = express.Router();

/**
 * GET /api/companies/:companyId/dashboard
 * Protected by auth and RBAC. Scoped to the specific company.
 */
router.get('/:companyId/dashboard', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { period = 'this_month' } = req.query;

    const data = await getDashboardData(companyId, period);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to generate dashboard data' }
    });
  }
});

export default router;
