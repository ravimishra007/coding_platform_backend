import { Challenge } from '../models/challenge.model.js';
import { challengeValidation } from '../validation/joiValidation.js';

export const createChallenge = async (req, res) => {
  try {
    const validatedData = challengeValidation.parse(req.body);
    const challenge = await Challenge.create(validatedData);
    res.status(201).json({ success: true, data: challenge });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({ success: true, data: challenges });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, error: 'Challenge not found' });
    }
    res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    const validatedData = challengeSchema.parse(req.body);
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    if (!challenge) {
      return res.status(404).json({ success: false, error: 'Challenge not found' });
    }
    res.status(200).json({ success: true, data: challenge });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, error: 'Challenge not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 