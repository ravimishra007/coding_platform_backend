import Joi from 'joi';

// Admin validation schema
export const adminValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobileNo: Joi.string().min(10).optional(),
  address: Joi.object({
    addressLine: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    pincode: Joi.string().optional()
  }),
  role: Joi.string().required(),
  avatar: Joi.string().optional(),
  adminRights: Joi.array().required(),
});

// User validation schema
export const userValidation = Joi.object({
  name: Joi.string().min(3).required(),
  country: Joi.string().required(),
  subscription: Joi.string().valid('Free', 'Premium'),
  joinDate: Joi.date().required(),
  avatar: Joi.string().uri()
});


export const challengeValidation = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.min': 'Title is required',
    'any.required': 'Title is required'
  }),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').required(),
  topic: Joi.string().min(1).required().messages({
    'string.min': 'Topic is required',
    'any.required': 'Topic is required'
  }),
  keywords: Joi.array().items(Joi.string()),
  problemStatement: Joi.string().min(1).required().messages({
    'string.min': 'Problem statement is required',
    'any.required': 'Problem statement is required'
  }),
  files: Joi.array().items(Joi.any()).optional()
}); 



// Validation for creating or updating a plan
export const planValidation = Joi.object({
  name: Joi.string().min(3).required(),
  monthlyPrice: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(),  // Validates a number with up to 2 decimal places
  yearlyPrice: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(),
  details: Joi.array().items(Joi.string().required()) 
});



// Validation for coupon creation and updates
export const couponValidation = Joi.object({
  code: Joi.string().min(3).required(),
  category: Joi.string().required(),
  discountAmount: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).optional(),  // Numeric with up to 2 decimal places
  discountPercent: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).optional(),
  maxCap: Joi.string().optional(),
  details: Joi.string().optional()
});
