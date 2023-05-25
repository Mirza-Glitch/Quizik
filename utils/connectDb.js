import mongoose from 'mongoose';

async function connectDb(){
  try {
    const uri = process.env.MONGO_CONNECTION_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Atlas Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  }
};

export default connectDb;
