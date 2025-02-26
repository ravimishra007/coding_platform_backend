import mongoose from 'mongoose';

const CouponFormDataSchema = new mongoose.Schema({
  code: { type: String, required: true },
  category: { type: String, required: true },
  discountAmount: { type: String },
  discountPercent: { type: String },
  maxCap: { type: String },
  details: { type: String }
});

const Coupon = mongoose.model('Coupon', CouponFormDataSchema);
export default Coupon;
