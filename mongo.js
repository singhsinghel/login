import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const leadSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    email: String,
    movingDate: Date,
    movingFrom: String,
    movingTo: String,
    notes: String,
  });

  const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  adminSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });

  adminSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
const Admin = mongoose.model('Admin', adminSchema);
const Lead = mongoose.model('Lead', leadSchema);

export default { Admin, Lead};