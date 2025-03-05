import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clerkId: { type: String },
  firstName: { type: String },
  lastName: { type: String},
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String}, 
  mobileNo: { type: String },
  role: { type: String, enum: ['admin', 'user'],default: 'user'},
  address: {
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String},
    pincode: { type: String }
  },
  assignedRole: { type: String },
  adminRights: { 
    type: [String]
  },  

  subscription: { 
    type: String, 
    enum: ["Free", "Plan A", "Plan B", "Plan C"], 
    default: "Free" 
  },
  avatar: { type: String }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
export default User;
