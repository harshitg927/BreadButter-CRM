const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Client = require('../models/Client');
const Talent = require('../models/Talent');
const Gig = require('../models/Gig');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/breadbutter-crm', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Clear existing data
async function clearDatabase() {
  try {
    await User.deleteMany({});
    await Client.deleteMany({});
    await Talent.deleteMany({});
    await Gig.deleteMany({});
    console.log('🧹 Cleared existing data');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
}

// Create sample users
async function createUsers() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: hashedPassword
      },
      {
        username: 'demo_user',
        email: 'demo@breadbutter.com',
        password: hashedPassword
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`👤 Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    return [];
  }
}

// Create sample clients
async function createClients(users) {
  try {
    const clients = [
      // Clients for user 1 (john_doe)
      {
        name: 'Zara India',
        contact: 'zara@brand.com',
        industry: 'Fashion',
        userId: users[0]._id
      },
      {
        name: 'Nike India',
        contact: 'nike@brand.com',
        industry: 'Sports',
        userId: users[0]._id
      },
      {
        name: 'Starbucks',
        contact: 'starbucks@coffee.com',
        industry: 'Food & Beverage',
        userId: users[0]._id
      },
      
      // Clients for user 2 (jane_smith)
      {
        name: 'Apple India',
        contact: 'apple@tech.com',
        industry: 'Technology',
        userId: users[1]._id
      },
      {
        name: 'Mercedes-Benz',
        contact: 'mercedes@auto.com',
        industry: 'Automotive',
        userId: users[1]._id
      },
      
      // Clients for user 3 (demo_user)
      {
        name: 'Red Bull',
        contact: 'redbull@energy.com',
        industry: 'Sports & Energy',
        userId: users[2]._id
      },
      {
        name: 'Airbnb',
        contact: 'airbnb@travel.com',
        industry: 'Travel & Hospitality',
        userId: users[2]._id
      }
    ];

    const createdClients = await Client.insertMany(clients);
    console.log(`🏢 Created ${createdClients.length} clients`);
    return createdClients;
  } catch (error) {
    console.error('❌ Error creating clients:', error);
    return [];
  }
}

// Create sample talents
async function createTalents(users) {
  try {
    const talents = [
      // Talents for user 1 (john_doe)
      {
        name: 'Aman Verma',
        skills: ['Photography', 'Candid', 'Travel', 'Portrait'],
        city: 'Goa',
        userId: users[0]._id
      },
      {
        name: 'Priya Singh',
        skills: ['Video Editing', 'Social Media', 'Content Creation'],
        city: 'Mumbai',
        userId: users[0]._id
      },
      {
        name: 'Rohit Sharma',
        skills: ['Graphic Design', 'Branding', 'UI/UX'],
        city: 'Delhi',
        userId: users[0]._id
      },
      
      // Talents for user 2 (jane_smith)
      {
        name: 'Meera Kapoor',
        skills: ['Fashion Photography', 'Studio Lighting', 'Retouching'],
        city: 'Mumbai',
        userId: users[1]._id
      },
      {
        name: 'Arjun Patel',
        skills: ['Videography', 'Drone Operations', 'Documentary'],
        city: 'Bangalore',
        userId: users[1]._id
      },
      
      // Talents for user 3 (demo_user)
      {
        name: 'Sneha Reddy',
        skills: ['Copywriting', 'Creative Direction', 'Brand Strategy'],
        city: 'Hyderabad',
        userId: users[2]._id
      },
      {
        name: 'Vikram Joshi',
        skills: ['Motion Graphics', 'Animation', '3D Modeling'],
        city: 'Pune',
        userId: users[2]._id
      }
    ];

    const createdTalents = await Talent.insertMany(talents);
    console.log(`🎨 Created ${createdTalents.length} talents`);
    return createdTalents;
  } catch (error) {
    console.error('❌ Error creating talents:', error);
    return [];
  }
}

// Create sample gigs
async function createGigs(users, clients, talents) {
  try {
    const gigs = [
      // Gigs for user 1 (john_doe)
      {
        title: 'Goa Beach Fashion Shoot',
        clientId: clients[0]._id, // Zara India
        talentId: talents[0]._id, // Aman Verma
        status: 'In Progress',
        userId: users[0]._id
      },
      {
        title: 'Nike Air Max Campaign',
        clientId: clients[1]._id, // Nike India
        talentId: talents[1]._id, // Priya Singh
        status: 'Delivered',
        userId: users[0]._id
      },
      {
        title: 'Starbucks Holiday Menu Design',
        clientId: clients[2]._id, // Starbucks
        talentId: talents[2]._id, // Rohit Sharma
        status: 'Pending',
        userId: users[0]._id
      },
      
      // Gigs for user 2 (jane_smith)
      {
        title: 'Apple iPhone Product Photography',
        clientId: clients[3]._id, // Apple India
        talentId: talents[3]._id, // Meera Kapoor
        status: 'In Progress',
        userId: users[1]._id
      },
      {
        title: 'Mercedes-Benz Brand Documentary',
        clientId: clients[4]._id, // Mercedes-Benz
        talentId: talents[4]._id, // Arjun Patel
        status: 'In Progress',
        userId: users[1]._id
      },
      
      // Gigs for user 3 (demo_user)
      {
        title: 'Red Bull Extreme Sports Campaign',
        clientId: clients[5]._id, // Red Bull
        talentId: talents[5]._id, // Sneha Reddy
        status: 'Delivered',
        userId: users[2]._id
      },
      {
        title: 'Airbnb Motion Graphics Package',
        clientId: clients[6]._id, // Airbnb
        talentId: talents[6]._id, // Vikram Joshi
        status: 'In Progress',
        userId: users[2]._id
      }
    ];

    const createdGigs = await Gig.insertMany(gigs);
    console.log(`💼 Created ${createdGigs.length} gigs`);
    return createdGigs;
  } catch (error) {
    console.error('❌ Error creating gigs:', error);
    return [];
  }
}

// Add sample updates to gigs
async function addGigUpdates(gigs) {
  try {
    const updates = [
      // Updates for gig 1 (Goa Beach Fashion Shoot)
      {
        gigId: gigs[0]._id,
        updates: [
          {
            note: 'Shoot scheduled for Nov 18-20, 2024',
            type: 'update',
            created_by: 'John Doe',
            timestamp: new Date('2024-11-15')
          },
          {
            note: 'Location scouting completed. Beach permits secured.',
            type: 'update',
            created_by: 'Aman Verma',
            timestamp: new Date('2024-11-16')
          }
        ]
      },
      // Updates for gig 2 (Nike Air Max Campaign)
      {
        gigId: gigs[1]._id,
        updates: [
          {
            note: 'Initial concept approval received',
            type: 'update',
            created_by: 'John Doe',
            timestamp: new Date('2024-11-10')
          },
          {
            note: 'Video editing completed and delivered',
            type: 'delivery',
            created_by: 'Priya Singh',
            timestamp: new Date('2024-11-14')
          }
        ]
      },
      // Updates for gig 3 (Starbucks Holiday Menu Design)
      {
        gigId: gigs[2]._id,
        updates: [
          {
            note: 'Project kickoff meeting scheduled',
            type: 'update',
            created_by: 'John Doe',
            timestamp: new Date('2024-11-17')
          }
        ]
      },
      // Updates for gig 4 (Apple iPhone Product Photography)
      {
        gigId: gigs[3]._id,
        updates: [
          {
            note: 'Studio booking confirmed for Nov 20-22',
            type: 'update',
            created_by: 'Jane Smith',
            timestamp: new Date('2024-11-16')
          }
        ]
      },
      // Updates for gig 5 (Mercedes-Benz Brand Documentary)
      {
        gigId: gigs[4]._id,
        updates: [
          {
            note: 'Pre-production meeting completed',
            type: 'update',
            created_by: 'Jane Smith',
            timestamp: new Date('2024-11-15')
          },
          {
            note: 'Equipment list finalized',
            type: 'update',
            created_by: 'Arjun Patel',
            timestamp: new Date('2024-11-16')
          }
        ]
      },
      // Updates for gig 6 (Red Bull Extreme Sports Campaign)
      {
        gigId: gigs[5]._id,
        updates: [
          {
            note: 'Campaign strategy presentation approved',
            type: 'milestone',
            created_by: 'Demo User',
            timestamp: new Date('2024-11-12')
          },
          {
            note: 'All creative assets delivered',
            type: 'delivery',
            created_by: 'Sneha Reddy',
            timestamp: new Date('2024-11-15')
          }
        ]
      },
      // Updates for gig 7 (Airbnb Motion Graphics Package)
      {
        gigId: gigs[6]._id,
        updates: [
          {
            note: 'Animation styleframes approved',
            type: 'milestone',
            created_by: 'Demo User',
            timestamp: new Date('2024-11-14')
          },
          {
            note: 'Working on final animations',
            type: 'update',
            created_by: 'Vikram Joshi',
            timestamp: new Date('2024-11-17')
          }
        ]
      }
    ];

    let totalUpdates = 0;
    for (const update of updates) {
      const gig = await Gig.findById(update.gigId);
      if (gig) {
        for (const noteUpdate of update.updates) {
          gig.updates.push(noteUpdate);
          totalUpdates++;
        }
        await gig.save();
      }
    }

    console.log(`📝 Added ${totalUpdates} updates to gigs`);
  } catch (error) {
    console.error('❌ Error adding gig updates:', error);
  }
}

// Main seeder function
async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  await connectDB();
  await clearDatabase();
  
  const users = await createUsers();
  const clients = await createClients(users);
  const talents = await createTalents(users);
  const gigs = await createGigs(users, clients, talents);
  
  // Skip gig updates for now - will be added manually via the app
  console.log('📝 Gig updates can be added manually via the application');
  
  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   Users: ${users.length}`);
  console.log(`   Clients: ${clients.length}`);
  console.log(`   Talents: ${talents.length}`);
  console.log(`   Gigs: ${gigs.length} (updates can be added via app)`);
  
  console.log('\n🔑 Test Login Credentials:');
  console.log('   Username: john_doe | Email: john@example.com | Password: password123');
  console.log('   Username: jane_smith | Email: jane@example.com | Password: password123');
  console.log('   Username: demo_user | Email: demo@breadbutter.com | Password: password123');
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Start the server: npm run dev');
  console.log('   2. Login with any test credentials');
  console.log('   3. Add notes to gigs via the application interface');
  
  mongoose.disconnect();
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase().catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
}

module.exports = seedDatabase; 