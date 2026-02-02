import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerService = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already exists');

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return {
    token: generateToken(user._id),
    user
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    token: generateToken(user._id),
    user
  };
};

export const getMeService = async (userId) => {
  return await User.findById(userId).select('-password');
};
