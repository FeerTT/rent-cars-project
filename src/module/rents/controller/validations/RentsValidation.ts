import { body } from 'express-validator';

export const CreateRentValidation = [
	body('carId')
		.notEmpty()
		.isInt()
		.withMessage('Car ID is required and must be a valid integer'),
	body('customerId')
		.notEmpty()
		.isInt()
		.withMessage('Customer ID is required and must be a valid integer'),
	body('unitPrice')
		.notEmpty()
		.isFloat({ min: 0 })
		.withMessage('Unit price is required and must be a valid number'),
	body('startDate')
		.notEmpty()
		.isISO8601()
		.toDate()
		.withMessage(
			'Start date is required and must be in ISO8601 format (example:, "2024-01-18T10:30:00.000Z")'
		),
	body('endDate')
		.notEmpty()
		.isISO8601()
		.toDate()
		.withMessage(
			'End date is required and must be in ISO8601 format (example:, "2024-01-18T10:30:00.000Z")'
		),
	body('totalPrice')
		.notEmpty()
		.isFloat({ min: 0 })
		.withMessage('Total price is required and must be a valid number'),
	body('paymentMethod')
		.notEmpty()
		.isIn(['cash', 'card'])
		.withMessage('Payment method must be "cash" or "card"'),
	body('isPaid')
		.notEmpty()
		.isBoolean()
		.withMessage('The field isPaid must be a boolean'),
];

export const UpdateRentValidation = [
	body('carId')
		.optional()
		.isInt()
		.withMessage('Car ID must be a valid integer'),
	body('customerId')
		.optional()
		.isInt()
		.withMessage('Customer ID must be a valid integer'),
	body('unitPrice')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Unit price must be a valid number'),
	body('startDate')
		.optional()
		.isISO8601()
		.toDate()
		.withMessage('Start date must be in ISO8601 format'),
	body('endDate')
		.optional()
		.isISO8601()
		.toDate()
		.withMessage('End date must be in ISO8601 format'),
	body('totalPrice')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Total price must be a valid number'),
	body('paymentMethod')
		.optional()
		.isIn(['cash', 'card'])
		.withMessage('Payment method must be "cash" or "card"'),
	body('isPaid')
		.optional()
		.isBoolean()
		.withMessage('The field isPaid must be a boolean'),
];
