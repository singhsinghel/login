import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import models from './mongo.js';
const {Lead}=models
import adminRoute from './admin.js'
import sendEmailToAdmin from './email.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
// Handle React routing, return all requests to React app

app.use(cors());
app.use(express.json());



mongoose.connect('mongodb+srv://singhelboyankit:J5ZR9LKOzjFNePqR@bagtokabandb.nxmlo.mongodb.net/?retryWrites=true&w=majority&appName=BagtoKabandb');

app.post('/api/leads', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, movingDate, movingFrom, movingTo, notes } = req.body;

    // Simple server-side validation
    if (!firstName || !lastName || !email || !phone || !movingDate || !movingFrom || !movingTo) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Full name concatenation
    const fullName = `${firstName} ${lastName}`;
    
    // Create the lead instance
    const lead = new Lead({
      fullName,
      email,
      phone,
      movingDate,
      movingFrom,
      movingTo,
      notes,
    });

    // Save the lead to the database
    await lead.save();
    await sendEmailToAdmin(lead);
    // Return success response
    res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

app.use('/api/admin',adminRoute)

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath, (err) => {
    console.log('index.html is open');
    
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
