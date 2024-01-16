import request from 'supertest';
import express from 'express';
import { CarsController, CarService } from '../module';

describe('CarsController', () => {
	let app: express.Express;
	let mockCarService: CarService;
	beforeEach(() => {
		mockCarService = {
			create: jest.fn(),
			getAll: jest.fn(),
			delete: jest.fn(),
			update: jest.fn(),
			getById: jest.fn(),
		} as unknown as CarService;
		app = express();
		app.use(express.json());
		const carsController = new CarsController(mockCarService);
		carsController.configureRoutes(app);
	});

	it('should get all cars successfully', async () => {
		const carsData = [
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
		mockCarService.getAll = jest.fn().mockResolvedValueOnce(carsData);
		const response = await request(app).get('/cars');

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			status: true,
			errors: '',
			data: carsData,
		});
		expect(mockCarService.getAll).toHaveBeenCalled();
	});

	it('should respond with 500 if an error occurs during getAll', async () => {
		mockCarService.getAll = jest
			.fn()
			.mockRejectedValueOnce(new Error('GetAll error'));
		const response = await request(app).get('/cars');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({
			status: false,
			errors: 'Error getting all the cars',
			data: null,
		});
		expect(mockCarService.getAll).toHaveBeenCalled();
	});

	//////////////////////////////////////////		TEST PARA CREACIÓN DE UN CAR

	it('should create a car successfully with valid data', async () => {
		const carData = {
			brand: 'TestBrand',
			model: 'TestModel',
			year: 2022,
			kms: 50000,
			color: 'Red',
			air_conditioning: true,
			passengers: 4,
			transmission: 'Automatic',
		};
		const createdCarData = {
			id: 31,
			...carData,
			updatedAt: '2024-01-16T14:46:01.095Z',
			createdAt: '2024-01-16T14:46:01.095Z',
		};
		mockCarService.create = jest.fn().mockResolvedValueOnce(createdCarData);

		const response = await request(app)
			.post('/cars/create')
			.send(JSON.stringify(carData))
			.set('Content-Type', 'application/json');

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			status: true,
			errors: '',
			data: createdCarData,
		});
		expect(mockCarService.create).toHaveBeenCalledWith(carData);
	});

	//////////////////////////////////////////		TESTS PARA UPDATE

	it('should respond with 400 if invalid car ID', async () => {
		const response = await request(app).put('/cars/update/invalidId');

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(false);
		expect(response.body.errors).toBe('Invalid car ID');
	});

	it('should respond with 404 if car ID not found', async () => {
		mockCarService.getById = jest.fn().mockResolvedValueOnce(null);

		const response = await request(app).put('/cars/update/1');

		expect(response.status).toBe(404);
		expect(response.body.status).toBe(false);
		expect(response.body.errors).toBe('No car was found with ID 1');
	});

	it('should update car data successfully', async () => {
		const mockCarData = {
			id: 1,
			brand: 'MockBrand',
			model: 'MockModel',
			year: 2022,
		};

		const updatedCarData = {
			brand: 'UpdatedBrand',
		};

		const respuesta = {
			status: true,
			message: 'Car updated successfully',
		};

		mockCarService.getById = jest.fn().mockResolvedValueOnce(mockCarData);
		mockCarService.update = jest.fn().mockResolvedValueOnce(respuesta);

		const response = await request(app)
			.put('/cars/update/1')
			.send(updatedCarData);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);
		expect(response.body.message).toBe('Car updated successfully');

		expect(mockCarService.update).toHaveBeenCalledWith(1, updatedCarData);
	});

	//////////////////////////////////////////TESTS PARA DELETE

	it('should delete a car successfully', async () => {
		const carId = 1;

		mockCarService.getById = jest.fn().mockResolvedValueOnce({
			id: carId,
			brand: 'TestBrand',
			model: 'TestModel',
			year: 2022,
			kms: 50000,
			color: 'Red',
			air_conditioning: true,
			passengers: 4,
			transmission: 'Automatic',
		});
		mockCarService.delete = jest.fn().mockResolvedValueOnce(undefined);

		const response = await request(app).delete(`/cars/delete/${carId}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			status: true,
			message: 'Car deleted successfully',
		});
		expect(mockCarService.getById).toHaveBeenCalledWith(carId);
		expect(mockCarService.delete).toHaveBeenCalledWith(carId);
	});

	it('should respond with 400 for invalid car ID during delete', async () => {
		const invalidCarId = 'invalidId';
		const response = await request(app).delete(
			`/cars/delete/${invalidCarId}`
		);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			status: false,
			errors: 'Invalid car ID.',
		});
		expect(mockCarService.getById).not.toHaveBeenCalled();
	});

	it('should respond with 404 if car ID is not found during delete', async () => {
		const nonExistingCarId = 999;
		mockCarService.getById = jest.fn().mockResolvedValueOnce(null);
		const response = await request(app).delete(
			`/cars/delete/${nonExistingCarId}`
		);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			status: false,
			errors: `No car was found with ID ${nonExistingCarId}`,
		});
		expect(mockCarService.getById).toHaveBeenCalledWith(nonExistingCarId);
		expect(mockCarService.delete).not.toHaveBeenCalled();
	});
});
