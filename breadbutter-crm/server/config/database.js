const mongoose = require('mongoose');

// Simple MongoDB connection
function connectDB() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err);
  });
}

module.exports = connectDB; 