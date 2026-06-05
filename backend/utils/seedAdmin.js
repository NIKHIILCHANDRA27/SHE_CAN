// c:\Users\chand\Desktop\SHE_Foundation\backend\utils\seedAdmin.js
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } from '../config/constants.js';
import { fileURLToPath } from 'url';

dotenv.config();

export const seedAdmin = async () => {
  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase().trim() });
  if (existing) {
    console.log('Admin user already exists:', ADMIN_EMAIL);
    return false;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL.toLowerCase().trim(), password: hashedPassword });
  console.log('Default admin created:', ADMIN_EMAIL);
  return true;
};

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const runSeed = async () => {
    try {
      await connectDB();
      await seedAdmin();
      process.exit(0);
    } catch (error) {
      console.error('Seed admin failed:', error);
      process.exit(1);
    }
  };

  runSeed();
}
