import ICar from '../../../entity/ICar';

export const carsData: ICar[] = [
	{
		id: 1,
		brand: 'VW',
		model: 'Gol',
		year: 2022,
		kms: 50000,
		color: 'Black',
		air_conditioning: true,
		passengers: 4,
		transmission: 'Automatic',
	},
	{
		id: 2,
		brand: 'VW',
		model: 'Suran',
		year: 2023,
		kms: 60000,
		color: 'White',
		air_conditioning: false,
		passengers: 5,
		transmission: 'Manual',
	},
];

export const carData: ICar = {
	brand: 'TestBrand',
	model: 'TestModel',
	year: 2022,
	kms: 50000,
	color: 'Red',
	air_conditioning: true,
	passengers: 4,
	transmission: 'Automatic',
};

export const createdCarData = {
	id: 31,
	...carData,
	updatedAt: '2024-01-16T14:46:01.095Z',
	createdAt: '2024-01-16T14:46:01.095Z',
};

export const createCarFixture = {
	body: {
		brand: 'VW',
		model: 'Gol',
		year: 2022,
		kms: 50000,
		color: 'Black',
		air_conditioning: true,
		passengers: 4,
		transmission: 'Automatic',
	},
};
