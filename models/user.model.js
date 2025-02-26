import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String },
  address: {
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String},
    pincode: { type: String }
  },

  subscription: { 
    type: String, 
    enum: ["Free", "Premium"], 
    default: "Free" 
  },
  avatar: { type: String }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
export default User;
