import User from '../models/user.model.js';
import { userValidation } from '../validation/joiValidation.js';
import jwt from 'jsonwebtoken';


// Create User
export const createUser = async (req, res) => {
  const { error } = userValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = new User({
      ...req.body
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '960h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token
    });
    console.log("user", user);
  } catch (err) {
    console.log("err", err);
    res.status(500).send('Error creating user');
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).send('Error updating user');
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('User not found');
    res.status(200).send('User deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
};
