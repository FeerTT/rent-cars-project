import { ValidationChain, body } from 'express-validator';

export const CreateCarValidation = [
	body('brand')
		.notEmpty()
		.isString()
		.isAlpha()
		.withMessage('La marca del auto es obligatoria'),
	body('model')
		.notEmpty()
		.isString()
		.withMessage('El modelo del auto es obligatorio'),
	body('year').isInt().withMessage('El año debe ser un número entero válido'),
	body('kms')
		.isInt()
		.withMessage('Los kilómetros deben ser un número entero válido'),
	body('color')
		.notEmpty()
		.isString()
		.isAlpha()
		.withMessage('El color del auto es obligatorio'),
	body('air_conditioning')
		.isBoolean()
		.withMessage('El campo air_conditioning debe ser un booleano'),
	body('passengers')
		.isInt()
		.withMessage('El número de pasajeros debe ser un número entero válido'),
	body('transmission')
		.isIn(['Manual', 'Automatic'])
		.withMessage('La transmisión debe ser Manual o Automatic'),
];

export const updateCarValidations = [
	body('brand')
		.optional()
		.notEmpty()
		.withMessage('La marca del auto es obligatoria')
		.isString()
		.isAlpha()
		.withMessage('La marca de autos debe ser un string válido'),
	body('model')
		.optional()
		.notEmpty()
		.withMessage('El modelo del auto es obligatorio')
		.isString()
		.withMessage('El modelo del auto debe ser una cadena'),
	body('year')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('El año debe ser un número entero válido')
		.isInt({ min: 1000, max: 9999 })
		.withMessage('El año debe ser un número entero válido de 4 dígitos'),
	body('kms')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('Los kilómetros deben ser un número entero válido'),
	body('color')
		.optional()
		.notEmpty()
		.isString()
		.withMessage('El color del auto es obligatorio'),
	body('air_conditioning')
		.optional()
		.isBoolean()
		.notEmpty()
		.withMessage('El campo air_conditioning debe ser un booleano'),
	body('passengers')
		.optional()
		.isInt()
		.notEmpty()
		.withMessage('El número de pasajeros debe ser un número entero válido'),
	body('transmission')
		.optional()
		.notEmpty()
		.isIn(['Manual', 'Automatic'])
		.withMessage('La transmisión debe ser Manual o Automatic'),
];
