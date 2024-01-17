import ICar from '../../../entity/ICar';

export const carIdToDelete = 1;

export const carToDelete: ICar = {
	id: carIdToDelete,
	brand: 'TestBrand',
	model: 'TestModel',
	year: 2022,
	kms: 50000,
	color: 'Red',
	air_conditioning: true,
	passengers: 4,
	transmission: 'Automatic',
};

export const deleteResponse = {
	status: true,
	message: 'Car deleted successfully',
};

export const invalidCarId = 'invalidId';

export const nonExistingCarId = 99999;
