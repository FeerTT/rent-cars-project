import { body, ValidationChain } from 'express-validator';

export const createCustomerValidations = [
	body('firstName')
		.notEmpty()
		.withMessage('The "firstName" field is required')
		.isString(),
	body('lastName')
		.notEmpty()
		.withMessage('The "lastName" field is required')
		.isString(),
	body('documentType')
		.notEmpty()
		.withMessage('The "documentType" field is required')
		.isString(),
	body('documentNumber')
		.notEmpty()
		.withMessage('The "documentNumber" field is required')
		.isNumeric(),
	body('nationality')
		.notEmpty()
		.withMessage('The "nationality" field is required')
		.isString(),
	body('address')
		.notEmpty()
		.withMessage('The "address" field is required')
		.isString(),
	body('phone')
		.notEmpty()
		.withMessage('The "phone" field is required')
		.isNumeric(),
	body('email')
		.notEmpty()
		.withMessage('The "email" field is required')
		.isEmail()
		.withMessage(
			'The "email" must be a valid email address (example: "example@hotmail.com")'
		),
	body('birthDate')
		.notEmpty()
		.withMessage('The "birthDate" field is required')
		.isISO8601()
		.withMessage(
			'The "birthDate" must be a valid ISO8601 date (example: "2022-01-17")'
		),
];

export const updateCustomerValidations = [
	body('firstName')
		.optional()
		.notEmpty()
		.withMessage('First name is required')
		.isString()
		.withMessage('First name must be a valid string'),

	body('lastName')
		.optional()
		.notEmpty()
		.withMessage('Last name is required')
		.isString()
		.withMessage('Last name must be a valid string'),

	body('documentType')
		.optional()
		.notEmpty()
		.withMessage('Document type is required')
		.isString()
		.withMessage('Document type must be a valid string'),

	body('documentNumber')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Document number is required')
		.withMessage('Document number must be a valid integer'),

	body('nationality')
		.optional()
		.notEmpty()
		.withMessage('Nationality is required')
		.isString()
		.withMessage('Nationality must be a valid string'),

	body('address')
		.optional()
		.notEmpty()
		.withMessage('Address is required')
		.isString()
		.withMessage('Address must be a valid string'),

	body('phone')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Phone number is required')
		.withMessage('Phone number must be a valid integer'),

	body('email')
		.optional()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Email must be a valid email address'),

	body('birthDate')
		.optional()
		.notEmpty()
		.withMessage('Birth date is required (example: "2024-01-18")')
		.isISO8601()
		.toDate()
		.withMessage(
			'Birth date must be in ISO8601 format (example: "2024-01-18")'
		),
];
