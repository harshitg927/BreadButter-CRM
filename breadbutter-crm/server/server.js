const express = require('express');
const cors = require('cors');
const { mockSummarize, mockExtractTasks, mockAIDelay } = require('./mockAI');
const { mockSlackNotification, mockNotionPage, mockWhatsAppPing, mockWebhook } = require('./mockIntegrations');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage with sample data
let data = {
  clients: [
    {id: 1, name: "Zara India", contact: "zara@brand.com", industry: "Fashion"},
    {id: 2, name: "Nike", contact: "nike@brand.com", industry: "Sports"}
  ],
  talents: [
    {id: 1, name: "Aman Verma", skills: ["Photography", "Candid", "Travel"], city: "Goa"},
    {id: 2, name: "Priya Singh", skills: ["Video", "Editing", "Social Media"], city: "Mumbai"}
  ],
  gigs: [
    {
      id: 1,
      title: "Goa Beach Shoot",
      clientId: 1,
      talentId: 1,
      status: "In Progress",
      updates: [
        {note: "Shoot scheduled for Nov 18-20", type: "text", created_by: "Ruchi", timestamp: "2024-07-14"}
      ]
    }
  ]
};

// Helper function to get next ID
const getNextId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

// CLIENT ENDPOINTS
app.get('/api/clients', (req, res) => {
  res.json(data.clients);
});

app.post('/api/clients', (req, res) => {
  const newClient = {
    id: getNextId(data.clients),
    ...req.body
  };
  data.clients.push(newClient);
  res.json(newClient);
});

app.put('/api/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const clientIndex = data.clients.findIndex(client => client.id === id);
  
  if (clientIndex === -1) {
    return res.status(404).json({ error: 'Client not found' });
  }
  
  data.clients[clientIndex] = { ...data.clients[clientIndex], ...req.body };
  res.json(data.clients[clientIndex]);
});

app.delete('/api/clients/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const clientIndex = data.clients.findIndex(client => client.id === id);
  
  if (clientIndex === -1) {
    return res.status(404).json({ error: 'Client not found' });
  }
  
  data.clients.splice(clientIndex, 1);
  res.json({ message: 'Client deleted successfully' });
});

// TALENT ENDPOINTS
app.get('/api/talents', (req, res) => {
  res.json(data.talents);
});

app.post('/api/talents', (req, res) => {
  const newTalent = {
    id: getNextId(data.talents),
    ...req.body
  };
  data.talents.push(newTalent);
  res.json(newTalent);
});

app.put('/api/talents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const talentIndex = data.talents.findIndex(talent => talent.id === id);
  
  if (talentIndex === -1) {
    return res.status(404).json({ error: 'Talent not found' });
  }
  
  data.talents[talentIndex] = { ...data.talents[talentIndex], ...req.body };
  res.json(data.talents[talentIndex]);
});

app.delete('/api/talents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const talentIndex = data.talents.findIndex(talent => talent.id === id);
  
  if (talentIndex === -1) {
    return res.status(404).json({ error: 'Talent not found' });
  }
  
  data.talents.splice(talentIndex, 1);
  res.json({ message: 'Talent deleted successfully' });
});

// GIG ENDPOINTS
app.get('/api/gigs', (req, res) => {
  res.json(data.gigs);
});

app.post('/api/gigs', (req, res) => {
  const newGig = {
    id: getNextId(data.gigs),
    updates: [],
    ...req.body
  };
  data.gigs.push(newGig);
  res.json(newGig);
});

app.put('/api/gigs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const gigIndex = data.gigs.findIndex(gig => gig.id === id);
  
  if (gigIndex === -1) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  
  data.gigs[gigIndex] = { ...data.gigs[gigIndex], ...req.body };
  res.json(data.gigs[gigIndex]);
});

app.delete('/api/gigs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const gigIndex = data.gigs.findIndex(gig => gig.id === id);
  
  if (gigIndex === -1) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  
  data.gigs.splice(gigIndex, 1);
  res.json({ message: 'Gig deleted successfully' });
});

// Add note to gig
app.post('/api/gigs/:id/notes', (req, res) => {
  const id = parseInt(req.params.id);
  const gig = data.gigs.find(gig => gig.id === id);
  
  if (!gig) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  
  const newNote = {
    ...req.body,
    timestamp: new Date().toISOString().split('T')[0]
  };
  
  gig.updates.push(newNote);
  res.json(gig);
});

// AI ENDPOINTS
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for summarization' });
    }
    
    // Add realistic delay for AI processing
    await mockAIDelay();
    
    const result = mockSummarize(text);
    res.json(result);
  } catch (error) {
    console.error('AI Summarize error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

app.post('/api/ai/extract-tasks', async (req, res) => {
  try {
    const { note } = req.body;
    
    if (!note || note.trim().length === 0) {
      return res.status(400).json({ error: 'Note is required for task extraction' });
    }
    
    // Add realistic delay for AI processing
    await mockAIDelay();
    
    const result = mockExtractTasks(note);
    res.json(result);
  } catch (error) {
    console.error('AI Extract Tasks error:', error);
    res.status(500).json({ error: 'Failed to extract tasks' });
  }
});

// INTEGRATION ENDPOINTS
app.post('/api/integrations/slack', async (req, res) => {
  try {
    const result = await mockSlackNotification(req.body);
    res.json(result);
  } catch (error) {
    console.error('Slack integration error:', error);
    res.status(500).json({ error: 'Failed to send Slack notification' });
  }
});

app.post('/api/integrations/notion', async (req, res) => {
  try {
    const result = await mockNotionPage(req.body);
    res.json(result);
  } catch (error) {
    console.error('Notion integration error:', error);
    res.status(500).json({ error: 'Failed to create Notion page' });
  }
});

app.post('/api/integrations/whatsapp', async (req, res) => {
  try {
    const result = await mockWhatsAppPing(req.body);
    res.json(result);
  } catch (error) {
    console.error('WhatsApp integration error:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
});

app.post('/api/integrations/webhook', async (req, res) => {
  try {
    const result = await mockWebhook(req.body);
    res.json(result);
  } catch (error) {
    console.error('Webhook integration error:', error);
    res.status(500).json({ error: 'Failed to trigger webhook' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`BreadButter CRM Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/clients');
  console.log('- POST /api/clients');
  console.log('- PUT /api/clients/:id');
  console.log('- DELETE /api/clients/:id');
  console.log('- GET /api/talents');
  console.log('- POST /api/talents');
  console.log('- PUT /api/talents/:id');
  console.log('- DELETE /api/talents/:id');
  console.log('- GET /api/gigs');
  console.log('- POST /api/gigs');
  console.log('- PUT /api/gigs/:id');
  console.log('- DELETE /api/gigs/:id');
  console.log('- POST /api/gigs/:id/notes');
  console.log('🧠 AI ENDPOINTS:');
  console.log('- POST /api/ai/summarize');
  console.log('- POST /api/ai/extract-tasks');
  console.log('🚀 INTEGRATION ENDPOINTS:');
  console.log('- POST /api/integrations/slack');
  console.log('- POST /api/integrations/notion');
  console.log('- POST /api/integrations/whatsapp');
  console.log('- POST /api/integrations/webhook');
}); 