const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {
  getAllGigs,
  createGig,
  updateGig,
  deleteGig,
  addNoteToGig
} = require('../controllers/gigController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getAllGigs);
router.post('/', createGig);
router.put('/:id', updateGig);
router.delete('/:id', deleteGig);
router.post('/:id/notes', addNoteToGig);

module.exports = router; 