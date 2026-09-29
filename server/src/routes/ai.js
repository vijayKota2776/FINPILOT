import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { requireWorkspaceMember } from '../middleware/authorization.js';
import { processQuery } from '../services/ai.service.js';

const router = express.Router({ mergeParams: true });

// @route   POST /api/companies/:companyId/ai/chat
// @desc    Send a message to the AI assistant
router.post('/:companyId/ai/chat', authenticateUser, requireWorkspaceMember, async (req, res) => {
  try {
    const { companyId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: { message: 'Message is required' } });
    }

    const responseText = await processQuery(companyId, message);
    
    res.json({ 
      success: true, 
      data: {
        text: responseText
      }
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error processing AI request' } });
  }
});

export default router;
