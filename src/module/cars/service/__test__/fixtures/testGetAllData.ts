import ICar from '../../../entity/Icars';

export const carList: ICar[] = [
	{
		id: 1,
		model: 'Spider',
		transmission: 'Automatic',
		passengers: 4,
		air_conditioning: true,
		color: 'Red',
		kms: 50000,
		year: 2022,
		brand: 'Ferrari',
	},
	{
		id: 2,
		model: 'Gol',
		transmission: 'Manual',
		passengers: 5,
		air_conditioning: false,
		color: 'Blue',
		kms: 60000,
		year: 2023,
		brand: 'VW',
	},
	{
		id: 3,
		model: 'A1',
		transmission: 'Manual',
		passengers: 5,
		air_conditioning: true,
		color: 'Blue',
		kms: 0,
		year: 2024,
		brand: 'Audi',
	},
];
