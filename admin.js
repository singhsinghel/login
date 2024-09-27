
import express from 'express';
import models from './mongo.js';
const {Lead,Admin}=models
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import cors from 'cors'
const app=express()
app.use(cors());


const router = express.Router();

router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;

  try {
    const existingAdmin = await Admin.find();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ username, password,email });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: admin._id, username: admin.username }, 'secretKey', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.get('/leads', async (req, res) => {
    try {
      const leads = await Lead.find();
      res.status(200).json({success:true,leads});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.delete('/leads/:id', async (req, res) => {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }
      res.status(200).json({ success: true, message: 'Lead deleted' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
  


export default router;
