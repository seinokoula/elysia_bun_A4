// Importing mongoose library
import mongoose from 'mongoose';

// Setting up the MongoDB URI based on the environment
let mongoDBURI;
if (process.env.NODE_ENV === 'test') {
  mongoDBURI = process.env.TEST_MONGODB_URI ?? 'mongodb://localhost:27017';
} else {
  mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
}

// Connecting to MongoDB
mongoose.connect(mongoDBURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
  });
// Exporting the mongoose library
export default mongoose;
