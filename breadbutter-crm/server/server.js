const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { mockSummarize, mockExtractTasks, mockAIDelay } = require('./mockAI');
const { mockSlackNotification, mockNotionPage, mockWhatsAppPing, mockWebhook } = require('./mockIntegrations');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const talentRoutes = require('./routes/talentRoutes');
const gigRoutes = require('./routes/gigRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/talents', talentRoutes);
app.use('/api/gigs', gigRoutes);

// AI ENDPOINTS (no authentication required)
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

// INTEGRATION ENDPOINTS (no authentication required)
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
}); 