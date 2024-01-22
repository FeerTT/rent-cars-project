import request from 'supertest';
import express from 'express';
import { CarsController, CarService } from '../../CarModule';
import { carsData, carData, createdCarData } from './fixtures/TestCreateCars';
import {
	mockCarData,
	responseUpdate,
	updatedCarData,
} from './fixtures/TestUpdateCars';
import {
	carIdToDelete,
	carToDelete,
	deleteResponse,
	invalidCarId,
	nonExistingCarId,
} from './fixtures/TestDeleteCars';
import ICar from '../../entity/ICar';

describe('End to end test', () => {
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
		const mockedGetAll = mockCarService.getAll as jest.Mock<
			Promise<ICar[]>
		>;
		mockedGetAll.mockResolvedValueOnce(carsData);
		const response = await request(app).get('/cars');
		expect(response.status).toBe(200);
		expect(response.body).toEqual(carsData);
		expect(mockedGetAll).toHaveBeenCalled();
	});

	it('should respond with 500 if an error occurs during getAll', async () => {
		mockCarService.getAll = jest
			.fn()
			.mockRejectedValueOnce(new Error('GetAll error'));
		const response = await request(app).get('/cars');
		expect(response.status).toBe(500);
		expect(response.body).toEqual({
			errors: 'Error getting all the cars:',
		});
		expect(mockCarService.getAll).toHaveBeenCalled();
	});

	it('should create a car successfully with valid data', async () => {
		mockCarService.create = jest.fn().mockResolvedValueOnce(createdCarData);

		const response = await request(app)
			.post('/cars')
			.send(JSON.stringify(carData))
			.set('Content-Type', 'application/json');

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			data: createdCarData,
			message: 'Car created successfully',
		});

		expect(mockCarService.create).toHaveBeenCalledWith(carData);
	});

	it('should respond with 400 if invalid car ID', async () => {
		const response = await request(app).put('/cars/invalidId');
		expect(response.status).toBe(400);
		expect(response.body.errors).toBe('Invalid car ID');

		expect(response.body.status).toBeUndefined();
	});

	it('should respond with 404 if car ID not found', async () => {
		mockCarService.getById = jest.fn().mockResolvedValueOnce(null);
		const response = await request(app).put('/cars/1');
		expect(response.status).toBe(404);
		expect(response.body).toEqual({
			errors: 'No car was found with ID 1',
		});
		expect(response.body.status).toBeUndefined();
	});

	it('should update car data successfully', async () => {
		mockCarService.getById = jest.fn().mockResolvedValueOnce(mockCarData);
		mockCarService.update = jest.fn().mockResolvedValueOnce(responseUpdate);
		const response = await request(app).put('/cars/1').send(updatedCarData);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Car updated successfully',
		});
		expect(response.body.status).toBeUndefined();
		expect(mockCarService.update).toHaveBeenCalledWith(1, updatedCarData);
	});

	it('should delete a car successfully', async () => {
		mockCarService.getById = jest.fn().mockResolvedValueOnce(carToDelete);
		mockCarService.delete = jest.fn().mockResolvedValueOnce(deleteResponse);
		const response = await request(app).delete(`/cars/${carIdToDelete}`);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Car deleted successfully',
		});
		expect(mockCarService.getById).toHaveBeenCalledWith(carIdToDelete);
		expect(mockCarService.delete).toHaveBeenCalledWith(carIdToDelete);
	});

	it('should respond with 400 for invalid car ID during delete', async () => {
		const response = await request(app).delete(`/cars/${invalidCarId}`);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			errors: 'Invalid car ID',
		});
		expect(mockCarService.getById).not.toHaveBeenCalled();
	});

	it('should respond with 404 if car ID is not found during delete', async () => {
		mockCarService.getById = jest.fn().mockResolvedValueOnce(null);
		const response = await request(app).delete(`/cars/${nonExistingCarId}`);
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty(
			'errors',
			`No car was found with ID ${nonExistingCarId}`
		);
		expect(mockCarService.getById).toHaveBeenCalledWith(nonExistingCarId);
		expect(mockCarService.delete).not.toHaveBeenCalled();
	});
});
