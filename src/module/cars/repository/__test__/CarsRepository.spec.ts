import { CarsModel, CarsRepository } from '../../CarsModule';
import { carToCreate, createdCar } from './fixtures/TestsCreateData';
import { expectedCars } from './fixtures/TestsGetAllData';
import { expectedCar, carId } from './fixtures/TestsGetIdData';
import { carIdToUpdate, updatedCarData } from './fixtures/TestsUpdateData';

describe('CarsRepository', () => {
	const mockCarModel: any = {
		create: jest.fn(),
		findAll: jest.fn(),
		destroy: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
	} as unknown as CarsModel;
	const carsRepository = new CarsRepository(mockCarModel);

	it('should create a car', async () => {
		mockCarModel.create.mockResolvedValueOnce(createdCar);
		const result = await carsRepository.create(carToCreate);
		expect(mockCarModel.create).toHaveBeenCalledWith(carToCreate);
		expect(result).toEqual(createdCar);
	});

	it('should get all cars', async () => {
		mockCarModel.findAll.mockResolvedValueOnce(expectedCars);
		const result = await carsRepository.getAll();
		expect(mockCarModel.findAll).toHaveBeenCalled();
		expect(result).toEqual(expectedCars);
	});

	it('should destroy a car', async () => {
		const destroyedRows = 1;
		mockCarModel.destroy.mockResolvedValueOnce(destroyedRows);
		const carIdToDelete = 1;
		const result = await carsRepository.delete(carIdToDelete);
		expect(mockCarModel.destroy).toHaveBeenCalledWith({
			where: {
				id: carIdToDelete,
			},
		});
		expect(result).toEqual(destroyedRows);
	});

	it('should get a car by ID', async () => {
		mockCarModel.findOne.mockResolvedValueOnce(expectedCar);
		const result = await carsRepository.getByID(carId);
		expect(mockCarModel.findOne).toHaveBeenCalledWith({
			where: {
				id: carId,
			},
		});
		expect(result).toEqual(expectedCar);
	});

	it('should update a car by ID', async () => {
		const updatedRows = 1;
		mockCarModel.update.mockResolvedValueOnce(updatedRows);
		const result = await carsRepository.update(
			carIdToUpdate,
			updatedCarData
		);
		expect(mockCarModel.update).toHaveBeenCalledWith(updatedCarData, {
			where: {
				id: carIdToUpdate,
			},
		});
		expect(result).toEqual(updatedRows);
		const updateOptions = mockCarModel.update.mock.calls[0][1];
		expect(updateOptions.where).toHaveProperty('id', carIdToUpdate);
	});

	it('should return null if car ID is not available', async () => {
		mockCarModel.update.mockResolvedValueOnce(null);
		const result = await carsRepository.update(carId, updatedCarData);
		expect(mockCarModel.update).toHaveBeenCalledWith(updatedCarData, {
			where: {
				id: carId,
			},
		});
		expect(result).toBeNull();
	});
});
