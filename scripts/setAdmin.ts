import mongoose from 'mongoose';

// Simple User schema for direct database access
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

async function setAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI not set');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const result = await User.updateOne(
      { email: 'admin@test.com' },
      { role: 'ADMIN' }
    );

    console.log('Update result:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

setAdmin();
