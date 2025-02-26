import Coupon from '../models/coupon.model.js';
import { couponValidation } from '../validation/joiValidation.js';

// Create a new coupon
export const createCoupon = async (req, res) => {
  const { error } = couponValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json({
      message: 'Coupon data created successfully',
      data: newCoupon
    });
  } catch (err) {
    res.status(500).send('Error creating coupon');
  }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).send('Error fetching coupons');
  }
};

// Get a coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).send('Coupon not found');
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).send('Error fetching coupon');
  }
};

// Update a coupon
export const updateCoupon = async (req, res) => {
  const { error } = couponValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCoupon) return res.status(404).send('Coupon not found');
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(500).send('Error updating coupon');
  }
};

// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) return res.status(404).send('Coupon not found');
    res.status(200).send('Coupon deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting coupon');
  }
};
