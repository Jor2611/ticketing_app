import mongoose from 'mongoose';
import { app } from './app';

const startUp = async () => {
  console.log('Boot Up!');
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI must be provided.');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to db!');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log(`Listening on port 3000!!!!!!!`);
  });
};

startUp();
