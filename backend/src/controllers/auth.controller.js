import {
  registerService,
  loginService,
  getMeService
} from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  const user = await getMeService(req.user.id);
  res.json(user);
};

export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
