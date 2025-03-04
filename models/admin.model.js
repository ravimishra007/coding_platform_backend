import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  clerkId: { type: String, },
  firstName: { type: String, },
  lastName: { type: String},
  username: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  mobileNo: { type: String },
  address: {
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String},
    pincode: { type: String }
  },
  role: { type: String, required: true },  
  avatar: { type: String },
  adminRights: { 
    type: [String]
    , required: true 
  },
  resetPasswordToken: { type: String, default: null },  // New field
  resetPasswordExpires: { type: Date, default: null }    // Expiry time
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;


