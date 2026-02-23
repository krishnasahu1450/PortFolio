import mongoose from 'mongoose';

export const database = {
  async connect() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    try {
      await mongoose.connect(uri, {
        dbName: process.env.DB_NAME || 'portfolio'
      });
      console.log('✅ Connected to MongoDB (Mongoose)');
    } catch (error) {
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  },
  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB (Mongoose)');
    } catch (error) {
      console.error('❌ Mongoose disconnect error:', error);
    }
  }
};