# Database Seeder

This seeder populates your MongoDB database with sample data for testing and development.

## What it creates:

### 🔐 Users (3 users):
- **john_doe** - john@example.com (password: password123)
- **jane_smith** - jane@example.com (password: password123)
- **demo_user** - demo@breadbutter.com (password: password123)

### 🏢 Clients (7 clients):
- **john_doe**: Zara India, Nike India, Starbucks
- **jane_smith**: Apple India, Mercedes-Benz
- **demo_user**: Red Bull, Airbnb

### 🎨 Talents (7 talents):
- **john_doe**: Aman Verma (Photography), Priya Singh (Video), Rohit Sharma (Design)
- **jane_smith**: Meera Kapoor (Fashion Photography), Arjun Patel (Videography)
- **demo_user**: Sneha Reddy (Copywriting), Vikram Joshi (Motion Graphics)

### 💼 Gigs (7 gigs):
- Basic gig structure with client-talent relationships
- Mix of statuses: In Progress, Delivered, Pending
- **Notes/Updates**: Can be added manually via the application interface

## How to run:

### Option 1: Using npm script (recommended)
```bash
npm run seed
```

### Option 2: Direct execution
```bash
node seeder/seedData.js
```

## Important Notes:

⚠️ **WARNING**: This seeder will **DELETE ALL EXISTING DATA** in your database before creating new sample data.

✅ **Prerequisites**: Make sure MongoDB is running on `localhost:27017`

🔑 **Login Credentials**: All users have the password `password123`

## Testing:

After running the seeder, you can:
1. Start your application: `npm run dev`
2. Login with any of the test credentials
3. See the sample data for that user
4. Add notes to gigs via the application interface
5. Test all CRM features with realistic data

## Data Structure:

Each user has their own isolated data:
- Users can only see their own clients, talents, and gigs
- Perfect for testing multi-user authentication
- Realistic business scenarios for testing workflows

## Adding Notes:

Since gig updates/notes are not seeded automatically, you can add them manually by:
1. Going to the "Projects" tab in the app
2. Clicking "Notes" button for any gig
3. Adding realistic project updates and notes
4. Testing the notes functionality across the application 