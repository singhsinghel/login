import nodemailer  from 'nodemailer'
import 'dotenv/config'
import models from './mongo.js';
const {Admin}=models
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like SendGrid, Outlook, etc.
    auth: {
      user: process.env.EMAIL,  // Admin's email
      pass: process.env.PASSWORD,   // Admin's email password
    },
  });

 
  // Function to send email
  const sendEmailToAdmin = async (lead) => {
    const admin = await Admin.find();
    const mailOptions = {
      from: process.env.EMAIL, 
      to: admin?admin.email:'singhelboyankit@gmail.com',
      subject: `New Lead Created: ${lead.fullName}`,
      text: `
        A new lead has been created:
        
        Full Name: ${lead.fullName}
        Email: ${lead.email}
        Phone: ${lead.phone}
        Moving Date: ${lead.movingDate}
        Moving From: ${lead.movingFrom}
        Moving To: ${lead.movingTo}
        Notes: ${lead.notes ? lead.notes : 'N/A'}
      `,
    };
  
    try {
      const admin=await Admin.find();
      if(admin){
      await transporter.sendMail(mailOptions);
      console.log('Email sent to admin');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

export default sendEmailToAdmin;