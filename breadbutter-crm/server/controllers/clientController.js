const Client = require('../models/Client');

// Get all clients for logged-in user
async function getAllClients(req, res) {
  try {
    const clients = await Client.find({ userId: req.user._id });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create new client
async function createClient(req, res) {
  try {
    const { name, contact, industry } = req.body;
    
    const client = new Client({
      name,
      contact,
      industry,
      userId: req.user._id
    });
    
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update client
async function updateClient(req, res) {
  try {
    const { id } = req.params;
    const { name, contact, industry } = req.body;
    
    const client = await Client.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { name, contact, industry },
      { new: true }
    );
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete client
async function deleteClient(req, res) {
  try {
    const { id } = req.params;
    
    const client = await Client.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllClients,
  createClient,
  updateClient,
  deleteClient
}; 