# 🍞 BreadButter Creative Ops & Comms Hub

A simple internal CRM/Project Tracker for BreadButter that helps manage clients, talents, gigs, and communications. This is a beginner-friendly MVP built with React and Express.js.

## 🚀 Features

- **Client Management**: Add, edit, and delete clients with contact information
- **Talent Management**: Manage talents with skills and location details
- **Gig Management**: Create and track gigs linking clients and talents
- **Notes System**: Add notes to gigs for project communication
- **Consolidated Notes View**: See all notes across all gigs in one place
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js
- **Styling**: Tailwind CSS
- **Storage**: In-memory (no database required)
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
│   │   │   └── NotesTab.jsx
│   │   ├── utils/
│   │   │   └── api.js       # API functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── ...
├── server/                 # Express backend
│   ├── server.js           # Main server file
│   └── package.json
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
   
   The frontend will start on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

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

### Viewing Notes
1. Click on "Notes" in the sidebar
2. View all notes from all gigs in chronological order
3. See which gig, client, and talent each note belongs to

## 🔧 API Endpoints

The backend provides the following REST API endpoints:

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Talents
- `GET /api/talents` - Get all talents
- `POST /api/talents` - Create new talent
- `PUT /api/talents/:id` - Update talent
- `DELETE /api/talents/:id` - Delete talent

### Gigs
- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create new gig
- `PUT /api/gigs/:id` - Update gig
- `DELETE /api/gigs/:id` - Delete gig
- `POST /api/gigs/:id/notes` - Add note to gig

## 🎨 Customization

### Changing Colors
The app uses Tailwind CSS with an orange color scheme. To change the primary color:

1. Edit the CSS classes in components (replace `orange-500`, `orange-600`, etc.)
2. Update the brand color in `Sidebar.jsx`

### Adding New Fields
To add new fields to clients, talents, or gigs:

1. Update the form in the respective component
2. Update the API endpoint in `server/server.js`
3. Update the table display in the component

### Modifying Status Options
To change gig status options, edit the `statusOptions` array in `GigsTab.jsx`.

## 🚫 Limitations

This is an MVP with the following limitations:
- No authentication/authorization
- No data persistence (data resets when server restarts)
- No file uploads
- No real-time updates
- No search/filtering functionality
- No data validation beyond basic required fields

## 🔮 Future Enhancements

Potential improvements for future versions:
- Add database persistence (MongoDB, PostgreSQL)
- Implement user authentication
- Add search and filtering
- File upload for project assets
- Email notifications
- Calendar integration
- Reporting and analytics
- Mobile app

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `server/server.js` (line 4) and `client/src/utils/api.js` (line 1)

2. **CORS errors**
   - Make sure the backend server is running on port 5000
   - Check that CORS is enabled in `server/server.js`

3. **Frontend not loading**
   - Ensure both servers are running
   - Check browser console for errors
   - Try refreshing the page

4. **API calls failing**
   - Verify backend server is running
   - Check network tab in browser developer tools
   - Ensure API_BASE URL is correct in `client/src/utils/api.js`

### Development Tips

- Use browser developer tools to debug API calls
- Check server terminal for backend errors
- Use React Developer Tools for component debugging
- Refresh the page if data seems out of sync

## 📝 License

This project is for internal use at BreadButter. No external license required.

## 👥 Contributing

This is an MVP for learning purposes. Feel free to extend and improve the functionality!

---

**Happy coding! 🎉**

For questions or support, reach out to the development team. 