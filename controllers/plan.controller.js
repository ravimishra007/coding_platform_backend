import Plan from '../models/plan.model.js';
import { planValidation } from '../validation/joiValidation.js';

// Create a new plan
export const createPlan = async (req, res) => {
  const { error } = planValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json({
      message: 'Plan data created successfully',
      data: newPlan
    });
  } catch (err) {
    res.status(500).send('Error creating plan');
  }
};

// Get all plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).send('Error fetching plans');
  }
};

// Get a plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).send('Plan not found');
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).send('Error fetching plan');
  }
};

// Update a plan
export const updatePlan = async (req, res) => {
  const { error } = planValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlan) return res.status(404).send('Plan not found');
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(500).send('Error updating plan');
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).send('Plan not found');
    res.status(200).send('Plan deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting plan');
  }
};
