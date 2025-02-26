import mongoose from 'mongoose';

const PlanFormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthlyPrice: { type: String, required: true },
  yearlyPrice: { type: String, required: true },
  details: [{ type: String, required: true }]
});

const Plan = mongoose.model('Plan', PlanFormDataSchema);
export default Plan;
