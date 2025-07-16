const Talent = require('../models/Talent');

// Get all talents for logged-in user
async function getAllTalents(req, res) {
  try {
    const talents = await Talent.find({ userId: req.user._id });
    res.json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new talent
async function createTalent(req, res) {
  try {
    const { name, skills, city } = req.body;
    
    const talent = new Talent({
      name,
      skills,
      city,
      userId: req.user._id
    });
    
    await talent.save();
    res.status(201).json(talent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update talent
async function updateTalent(req, res) {
  try {
    const { id } = req.params;
    const { name, skills, city } = req.body;
    
    const talent = await Talent.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, skills, city },
      { new: true }
    );
    
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }
    
    res.json(talent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete talent
async function deleteTalent(req, res) {
  try {
    const { id } = req.params;
    
    const talent = await Talent.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }
    
    res.json({ message: 'Talent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTalents,
  createTalent,
  updateTalent,
  deleteTalent
}; 