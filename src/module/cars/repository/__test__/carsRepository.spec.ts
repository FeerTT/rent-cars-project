import { CarsModel, CarsRepository } from '../../module';
import { carToCreate, createdCar } from './fixtures/testCreateData';
import { expectedCars } from './fixtures/testGetAllData';
import { expectedCar, carId } from './fixtures/testGetIdData';
import { carIdToUpdate, updatedCarData } from './fixtures/testUpdateData';

describe('CarsRepository', () => {
	let mockCarModel: any;
	beforeEach(() => {
		mockCarModel = {
			create: jest.fn(),
			findAll: jest.fn(),
			destroy: jest.fn(),
			findOne: jest.fn(),
			update: jest.fn(),
		} as unknown as CarsModel;
	});

	it('should create a car', async () => {
		const carsRepository = new CarsRepository(mockCarModel);
		mockCarModel.create.mockResolvedValueOnce(createdCar);
		const result = await carsRepository.create(carToCreate);
		expect(mockCarModel.create).toHaveBeenCalledWith(carToCreate);
		expect(result).toEqual(createdCar);
	});

	it('should get all cars', async () => {
		const carsRepository = new CarsRepository(mockCarModel);
		mockCarModel.findAll.mockResolvedValueOnce(expectedCars);
		const result = await carsRepository.getAll();
		expect(mockCarModel.findAll).toHaveBeenCalled();
		expect(result).toEqual(expectedCars);
	});

	it('should destroy a car', async () => {
		const carsRepository = new CarsRepository(mockCarModel);
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
		const carsRepository = new CarsRepository(mockCarModel);
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
		const carsRepository = new CarsRepository(mockCarModel);
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
		const carsRepository = new CarsRepository(mockCarModel);
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
