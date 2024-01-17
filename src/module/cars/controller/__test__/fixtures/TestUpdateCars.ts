import ICar from '../../../entity/ICar';

export const mockCarData: ICar = {
	brand: 'VW',
	model: 'Gol',
	year: 2022,
	kms: 50000,
	color: 'Black',
	air_conditioning: true,
	passengers: 4,
	transmission: 'Automatic',
};
export const updatedCarData = {
	brand: 'VW',
	model: 'Vento',
	year: 2000,
};
export const responseUpdate = {
	status: true,
	message: 'Car updated successfully',
};

export const updateCarFixture = {
	params: {
		id: 1,
	},
	body: {
		brand: 'UpdatedBrand',
		model: 'UpdatedModel',
		year: 2023,
		kms: 20000,
		color: 'Red',
		air_conditioning: false,
		passengers: 4,
		transmission: 'Manual',
	},
};

export const carID = 1;
