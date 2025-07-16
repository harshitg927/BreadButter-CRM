const Gig = require('../models/Gig');

// Get all gigs for logged-in user
async function getAllGigs(req, res) {
  try {
    const gigs = await Gig.find({ userId: req.user._id });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new gig
async function createGig(req, res) {
  try {
    const { title, clientId, talentId, status } = req.body;
    
    const gig = new Gig({
      title,
      clientId,
      talentId,
      status,
      userId: req.user._id
    });
    
    await gig.save();
    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update gig
async function updateGig(req, res) {
  try {
    const { id } = req.params;
    const { title, clientId, talentId, status } = req.body;
    
    const gig = await Gig.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, clientId, talentId, status },
      { new: true }
    );
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete gig
async function deleteGig(req, res) {
  try {
    const { id } = req.params;
    
    const gig = await Gig.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    res.json({ message: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add note to gig
async function addNoteToGig(req, res) {
  try {
    const { id } = req.params;
    const { note, type, created_by } = req.body;
    
    const gig = await Gig.findOne({ _id: id, userId: req.user._id });
    
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    
    const newNote = {
      note,
      type,
      created_by,
      timestamp: new Date()
    };
    
    gig.updates.push(newNote);
    await gig.save();
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllGigs,
  createGig,
  updateGig,
  deleteGig,
  addNoteToGig
}; 