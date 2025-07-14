# 🍞 BreadButter Creative Ops & Comms Hub

A comprehensive internal CRM/Project Tracker for BreadButter that helps manage clients, talents, gigs, and communications with **AI-powered features** and **external integrations**. This is a beginner-friendly application built with React and Express.js.

## 🚀 Features

### Core CRM Features
- **Client Management**: Add, edit, and delete clients with contact information
- **Talent Management**: Manage talents with skills and location details
- **Gig Management**: Create and track gigs linking clients and talents
- **Notes System**: Add notes to gigs for project communication
- **Consolidated Notes View**: See all notes across all gigs in one place
- **Responsive Design**: Works on desktop and mobile devices

### 🧠 AI-Powered Features
- **AI Summary Generation**: Upload meeting transcripts and generate intelligent summaries with topic tags
- **Smart Task Extraction**: Extract action items from meeting notes using AI pattern recognition
- **Topic Tag Detection**: Automatically categorize content by budget, timeline, creative direction, etc.
- **Interactive Task Management**: Track extracted tasks with completion status and progress visualization

### 🚀 External Integrations
- **Slack Integration**: Send project notifications to team channels
- **Notion Integration**: Auto-create project documentation pages
- **WhatsApp Integration**: Send updates to clients and team members
- **Webhook Integration**: Trigger custom automations and external workflows

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js with async/await
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios (for API calls)
- **Storage**: In-memory (no database required)
- **AI**: Mock AI functions with pattern recognition
- **Development**: Hot reload for both frontend and backend

## 📁 Project Structure

```
breadbutter-crm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ClientsTab.jsx
│   │   │   ├── TalentsTab.jsx
│   │   │   ├── GigsTab.jsx
│   │   │   ├── NotesTab.jsx
│   │   │   ├── AIFeatures.jsx         # 🧠 AI summary generation
│   │   │   ├── IntegrationsPanel.jsx  # 🚀 External integrations
│   │   │   └── TaskExtractor.jsx      # 🔍 Task extraction
│   │   ├── utils/
│   │   │   └── api.js       # API functions with AI endpoints
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── ...
├── server/                 # Express backend
│   ├── server.js           # Main server with AI endpoints
│   ├── mockAI.js           # 🧠 Mock AI functions
│   ├── mockIntegrations.js # 🚀 Mock integration functions
│   └── package.json
├── sample-transcript.txt   # Sample data for testing AI features
└── README.md               # This file
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd breadbutter-crm
   
   # Or just download and extract the project folder
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

You need to run both the backend and frontend servers:

1. **Start the backend server** (in one terminal)
   ```bash
   cd server
   npm run dev
   ```
   
   The server will start on `http://localhost:5000`

2. **Start the frontend development server** (in another terminal)
   ```bash
   cd client
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173` (Vite default port)

3. **Open your browser** and navigate to `http://localhost:5173`

## 📊 Sample Data

The application comes with sample data pre-loaded:

**Clients:**
- Zara India (Fashion)
- Nike (Sports)

**Talents:**
- Aman Verma (Photography, Candid, Travel) - Goa
- Priya Singh (Video, Editing, Social Media) - Mumbai

**Gigs:**
- Goa Beach Shoot (Zara India + Aman Verma)

**AI Testing Data:**
- `sample-transcript.txt` - Meeting transcript for testing AI summary generation
- Sample notes with action items for testing task extraction

## 🎯 How to Use

### Managing Clients
1. Click on "Clients" in the sidebar
2. Click "Add Client" to create a new client
3. Fill in name, contact email, and industry
4. Edit or delete clients using the action buttons

### Managing Talents
1. Click on "Talents" in the sidebar
2. Click "Add Talent" to create a new talent
3. Fill in name, skills (comma-separated), and city
4. Edit or delete talents using the action buttons

### Managing Gigs
1. Click on "Gigs" in the sidebar
2. Click "Add Gig" to create a new gig
3. Fill in title, select client and talent from dropdowns
4. Set status (In Progress, Delivered, Pending)
5. Click "Notes" to add project updates
6. Edit or delete gigs using the action buttons

### 🧠 Using AI Features

#### AI Summary Generation
1. Go to **"Projects"** tab
2. Scroll to **"🧠 AI Features"** section
3. Click **"Choose File"** and upload a `.txt` transcript file
4. Click **"✨ Generate Summary"**
5. View the AI-generated summary and detected topic tags

#### Task Extraction
1. Go to **"Notes"** tab
2. Scroll to **"🔍 Extract Tasks from Notes"** section
3. Enter meeting notes with action items (e.g., "need to finalize budget")
4. Click **"🔍 Extract Tasks"**
5. Check/uncheck tasks to track progress

### 🚀 Using Integrations

1. Go to **"Projects"** tab
2. Scroll to **"🚀 Integrations"** section
3. Click integration buttons:
   - **📱 Notify Slack**: Send project updates to team channels
   - **📝 Create Notion Page**: Generate project documentation
   - **💬 Ping WhatsApp**: Send client/team updates
   - **🔗 Trigger Webhook**: Activate external automations
4. Monitor status messages and check console for detailed logs

### Viewing All Notes
1. Click on "Notes" in the sidebar
2. View all notes from all gigs in chronological order
3. See which gig, client, and talent each note belongs to

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

### Core CRM Endpoints
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

- `GET /api/talents` - Get all talents
- `POST /api/talents` - Create new talent
- `PUT /api/talents/:id` - Update talent
- `DELETE /api/talents/:id` - Delete talent

- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create new gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig
- `POST /api/gigs/:id/notes` - Add note to gig

### 🧠 AI Endpoints
- `POST /api/ai/summarize` - Generate AI summary from text
- `POST /api/ai/extract-tasks` - Extract tasks from notes

### 🚀 Integration Endpoints
- `POST /api/integrations/slack` - Send Slack notification
- `POST /api/integrations/notion` - Create Notion page
- `POST /api/integrations/whatsapp` - Send WhatsApp message
- `POST /api/integrations/webhook` - Trigger webhook

## 🧠 AI Feature Details

### Mock AI Implementation
All AI features are **mocked** and work without external API keys:

- **Summarization**: Uses first 150 words + keyword-based tag detection
- **Task Extraction**: Pattern-based recognition for action items
- **Topic Tags**: Detects budget, timeline, creative direction, location, talent, equipment, client communication
- **Realistic Delays**: 1-3 second processing time for authentic feel

### Supported Task Patterns
The AI can detect tasks from patterns like:
- "need to [action]"
- "must [action]"
- "should [action]"
- "todo: [action]"
- "action: [action]"
- "will [action]"

### Topic Tag Detection
AI automatically detects these categories:
- **Budget**: cost, money, price, amount, budget
- **Creative Direction**: creative, design, visual, style
- **Timeline**: deadline, schedule, complete, delivery
- **Location**: venue, shoot, place, location
- **Talent**: talent, team, crew, photographer
- **Equipment**: camera, gear, rental, equipment
- **Client Communication**: client, approval, feedback, meeting

## 🚀 Integration Details

### Mock Integration Implementation
All integrations are **mocked** and log to console:

- **Slack**: Simulates channel notifications
- **Notion**: Generates mock page URLs
- **WhatsApp**: Simulates message sending
- **Webhook**: Sends structured data to mock endpoints

### Integration Features
- **Real-time Status Messages**: Success/error feedback
- **Loading States**: Visual feedback during processing
- **Detailed Logging**: Console output for debugging
- **Error Handling**: Graceful failure with retry suggestions

## 🧪 Testing AI Features

### Sample Meeting Transcript
Create a `.txt` file with content like:
```
Meeting with Nike team on December 15, 2024.
Budget discussion: ₹2,50,000 approved for Mumbai street campaign.
Creative direction: Focus on authentic street style and urban culture.
Timeline: Must complete by January 25, 2025.
Need to finalize location permits by December 18.
Must confirm talent availability by December 26.
```

### Sample Notes for Task Extraction
```
We need to finalize the budget by Friday.
Must book the location for the shoot.
Should confirm talent availability.
Todo: arrange equipment rental.
Action: coordinate with the client team.
```

## 🔍 Key Updates Made

### ✅ Corrections Made:
1. **Port Number**: Fixed frontend port from 3000 to 5173 (Vite default)
2. **Project Structure**: Added all new AI component files
3. **Tech Stack**: Added Axios as HTTP client
4. **Features**: Completely updated to include AI and integration features
5. **API Endpoints**: Added all new AI and integration endpoints
6. **Sample Data**: Added AI testing data information

### ✅ New Sections Added:
1. **AI Feature Details**: Comprehensive explanation of mock AI implementation
2. **Integration Details**: Mock integration functionality
3. **Testing AI Features**: Sample data and testing instructions
4. **Development Notes**: Technical details for developers
5. **AI-specific Troubleshooting**: Common AI feature issues

### ✅ Enhanced Sections:
1. **How to Use**: Added AI and integration usage instructions
2. **Customization**: Added guidance for extending AI features
3. **Future Enhancements**: Updated with realistic next steps
4. **Troubleshooting**: Added AI-specific debugging tips

The README now accurately reflects your current codebase with all the AI and integration features implemented! 🎯

## 🎨 Customization

### Changing Colors
The app uses Tailwind CSS with a blue/orange color scheme. To change colors:

1. Edit CSS classes in components (replace `blue-500`, `orange-600`, etc.)
2. Update brand colors in `Sidebar.jsx`

### Adding New AI Features
To add new AI capabilities:

1. Add mock functions in `server/mockAI.js`
2. Create new API endpoints in `server/server.js`
3. Add API calls in `client/src/utils/api.js`
4. Create UI components in `client/src/components/`

### Adding New Integrations
To add new integrations:

1. Add mock functions in `server/mockIntegrations.js`
2. Create API endpoints in `server/server.js`
3. Add integration buttons in `IntegrationsPanel.jsx`

## 🚫 Current Limitations

This application has the following limitations:
- No authentication/authorization
- No data persistence (data resets when server restarts)
- No file uploads beyond AI transcript feature
- No real-time updates between users
- AI features are mocked (no real AI APIs)
- Integrations are mocked (no real external connections)
- No advanced search/filtering

## 🔮 Future Enhancements

### Infrastructure
- Add database persistence (MongoDB, PostgreSQL)
- Implement user authentication and authorization
- Add real-time updates with WebSockets
- Deploy to cloud platforms (AWS, Vercel, etc.)

### AI Features
- Connect to real AI APIs (OpenAI, Claude, etc.)
- Advanced natural language processing
- Sentiment analysis for client feedback
- Predictive analytics for project outcomes

### Integrations
- Real integration with external services
- OAuth authentication for integrations
- Webhook security with signature verification
- Integration status monitoring and health checks

### UI/UX
- Advanced search and filtering
- Drag-and-drop file uploads
- Real-time notifications
- Mobile app version
- Dark mode support

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Frontend: Change port in `vite.config.js`
   - Backend: Change port in `server/server.js` and update API_BASE in `client/src/utils/api.js`

2. **CORS errors**
   - Ensure backend server is running on port 5000
   - Check CORS configuration in `server/server.js`

3. **AI features not working**
   - Verify `mockAI.js` and `mockIntegrations.js` are properly imported
   - Check browser console for JavaScript errors
   - Ensure file uploads are `.txt` format

4. **Integration buttons not responding**
   - Check server logs for backend errors
   - Verify API endpoints are properly configured
   - Check network tab in browser developer tools

5. **Frontend not loading**
   - Ensure both servers are running
   - Check browser console for errors
   - Verify the correct port (5173 for Vite)

### Debug Tips

- **Frontend**: Use browser developer tools and React DevTools
- **Backend**: Check server terminal for errors and API logs
- **AI Features**: Monitor console for detailed AI processing logs
- **Integrations**: Watch server console for integration activity
- **Network**: Use browser network tab to debug API calls

## 🧑‍💻 Development Notes

### Mock AI Functions
Located in `server/mockAI.js`:
- `mockSummarize()`: Text summarization with tag detection
- `mockExtractTasks()`: Pattern-based task extraction
- `mockAIDelay()`: Simulates processing time

### Mock Integration Functions
Located in `server/mockIntegrations.js`:
- `mockSlackNotification()`: Slack message simulation
- `mockNotionPage()`: Notion page creation
- `mockWhatsAppPing()`: WhatsApp message sending
- `mockWebhook()`: Webhook trigger simulation

### Component Structure
- **AIFeatures.jsx**: File upload, summary generation, tag display
- **IntegrationsPanel.jsx**: Integration buttons, status messages
- **TaskExtractor.jsx**: Task extraction, progress tracking

## 👥 Contributing

This project welcomes contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

Focus areas for contribution:
- Real AI integration
- Additional external service integrations
- UI/UX improvements
- Performance optimizations
- Test coverage

---

## 🎉 Getting Started with AI Features

1. **Start the application** following the Quick Start guide
2. **Upload a transcript** using the provided `sample-transcript.txt`
3. **Generate AI summary** and explore topic tags
4. **Extract tasks** from meeting notes
5. **Test integrations** and monitor console output
6. **Customize** mock functions for your specific needs

**Happy coding! 🚀**