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
