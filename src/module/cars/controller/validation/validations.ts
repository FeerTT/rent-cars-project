import { ValidationChain, body } from 'express-validator';

export const CreateCarValidation = [
	body('brand')
		.notEmpty()
		.isString()
		.isAlpha()
		.withMessage('The car brand is required'),
	body('model')
		.notEmpty()
		.isString()
		.withMessage('The car model is required'),
	body('year')
		.notEmpty()
		.isInt({ min: 1000, max: 9999 })
		.withMessage('The year must be a valid integer'),
	body('kms')
		.notEmpty()
		.isInt()
		.withMessage('The kilometers must be a valid integer'),
	body('color')
		.notEmpty()
		.isString()
		.isAlpha()
		.withMessage('The car color is required'),
	body('air_conditioning')
		.isBoolean()
		.notEmpty()
		.withMessage('The air conditioning field must be a boolean'),
	body('passengers')
		.isInt()
		.notEmpty()
		.withMessage('The number of passengers must be a valid integer'),
	body('transmission')
		.notEmpty()
		.isIn(['Manual', 'Automatic'])
		.withMessage('The transmission must be Manual or Automatic'),
];
export const updateCarValidations = [
	body('brand')
		.optional()
		.notEmpty()
		.withMessage('Car brand is required')
		.isString()
		.isAlpha()
		.withMessage('Car brand must be a valid string'),
	body('model')
		.optional()
		.notEmpty()
		.withMessage('Car model is required')
		.isString()
		.withMessage('Car model must be a string'),
	body('year')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Year must be a valid integer')
		.isInt({ min: 1000, max: 9999 })
		.withMessage('Year must be a valid 4-digit integer'),
	body('kms')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Kilometers must be a valid integer'),
	body('color')
		.optional()
		.notEmpty()
		.isString()
		.withMessage('Car color is required'),
	body('air_conditioning')
		.optional()
		.isBoolean()
		.notEmpty()
		.withMessage('Air conditioning field must be a boolean'),
	body('passengers')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Number of passengers must be a valid integer'),
	body('transmission')
		.optional()
		.notEmpty()
		.isIn(['Manual', 'Automatic'])
		.withMessage('Transmission must be Manual or Automatic'),
];
