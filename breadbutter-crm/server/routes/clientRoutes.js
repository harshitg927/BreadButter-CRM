const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const {
  getAllClients,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getAllClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router; 