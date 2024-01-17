import ICar from '../../../entity/ICar';

export const carId = 1;

export const expectedCar: ICar | null = {
	id: carId,
	brand: 'Toyota',
	model: 'Camry',
	year: 2022,
	kms: 15000,
	color: 'Blue',
	air_conditioning: true,
	passengers: 5,
	transmission: 'Automatic',
};
