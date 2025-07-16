const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {
  getAllTalents,
  createTalent,
  updateTalent,
  deleteTalent
} = require('../controllers/talentController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getAllTalents);
router.post('/', createTalent);
router.put('/:id', updateTalent);
router.delete('/:id', deleteTalent);

module.exports = router; 