import { CarsModel, CarsRepository } from '../module';
import iCar from '../entity/iCar';

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
		const createdCar: iCar = {
			id: 1,
			brand: 'Toyota',
			model: 'Camry',
			year: 2022,
			kms: 15000,
			color: 'Blue',
			air_conditioning: true,
			passengers: 5,
			transmission: 'Automatic',
		};
		mockCarModel.create.mockResolvedValueOnce(createdCar);
		const carToCreate: iCar = {
			brand: 'Toyota',
			model: 'Camry',
			year: 2022,
			kms: 15000,
			color: 'Blue',
			air_conditioning: true,
			passengers: 5,
			transmission: 'Automatic',
		};
		const result = await carsRepository.create(carToCreate);
		//		verifico que los datos se hayan pasado correctamente
		expect(mockCarModel.create).toHaveBeenCalledWith(carToCreate);
		//		verifico que el car se haya generado
		expect(result).toEqual(createdCar);
	});
	it('should get all cars', async () => {
		const carsRepository = new CarsRepository(mockCarModel);
		const expectedCars: iCar[] = [
			{
				id: 1,
				brand: 'Toyota',
				model: 'Camry',
				year: 2022,
				kms: 15000,
				color: 'Blue',
				air_conditioning: true,
				passengers: 5,
				transmission: 'Automatic',
			},
			{
				id: 25,
				brand: 'VW',
				model: 'Gol Trend',
				year: 2014,
				kms: 15000,
				color: 'White',
				air_conditioning: true,
				passengers: 5,
				transmission: 'Manual',
			},
		];
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

		// Verifico que el ID sea el que enviaron (en este caso, hardcodeado)
		expect(mockCarModel.destroy).toHaveBeenCalledWith({
			where: {
				id: carIdToDelete,
			},
		});
		expect(result).toEqual(destroyedRows);
	});
	it('should get a car by ID', async () => {
		const carsRepository = new CarsRepository(mockCarModel);

		//    el mock va a retornar un objeto de tipo iCar o en caso de que el ID no corresponda, null.
		const carId = 1;
		const expectedCar: iCar | null = {
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

		const carId = 1;
		const updatedCarData: iCar = {
			brand: 'Updated Brand',
			model: 'Updated Model',
			year: 2023,
			kms: 20000,
			color: 'Red',
			air_conditioning: false,
			passengers: 4,
			transmission: 'Manual',
		};
		const updatedRows = 1;
		mockCarModel.update.mockResolvedValueOnce(updatedRows);

		const result = await carsRepository.update(carId, updatedCarData);

		// modifico la data donde where id carId
		expect(mockCarModel.update).toHaveBeenCalledWith(updatedCarData, {
			where: {
				id: carId,
			},
		});
		// verifico que se haya actualizado la nueva data.
		expect(result).toEqual(updatedRows);

		// verifico que el método update se llamó con la opción where que tiene el campo id
		const updateOptions = mockCarModel.update.mock.calls[0][1];
		expect(updateOptions.where).toHaveProperty('id', carId);
	});

	it('should return null if car ID is not available', async () => {
		const carsRepository = new CarsRepository(mockCarModel);

		const carId = 25;
		const updatedCarData: iCar = {
			brand: 'Updated Brand',
			model: 'Updated Model',
			year: 2023,
			kms: 20000,
			color: 'Red',
			air_conditioning: false,
			passengers: 4,
			transmission: 'Manual',
		};
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
