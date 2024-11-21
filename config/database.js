import mongoose from 'mongoose';

// Replace with your MongoDB connection string
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/homevue';

const initDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(DB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Export mongoose for use in other files
export { mongoose, initDatabase };
