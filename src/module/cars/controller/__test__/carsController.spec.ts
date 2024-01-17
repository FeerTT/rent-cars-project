import { CarService, CarsController } from '../../CarsModule';
import { Request, Response } from 'express';
import { createCarFixture } from './fixtures/TestCreateCars';
import { viewCarFixture } from './fixtures/TestViewCars';
import {
	updateCarFixture,
	mockCarData,
	carID,
} from './fixtures/TestUpdateCars';

describe('CarsController', () => {
	const mockCarService = {
		create: jest.fn(),
		getAll: jest.fn(),
		delete: jest.fn(),
		update: jest.fn(),
		getById: jest.fn(),
	} as unknown as CarService;
	const carsController = new CarsController(mockCarService);

	it('should call carsService.getAll once', async () => {
		const req = {} as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await carsController.index(req, res);
		expect(mockCarService.getAll).toHaveBeenCalledTimes(1);
	});

	it('should call carsService.create once', async () => {
		const req = {
			body: createCarFixture.body,
		} as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await carsController.create(req, res);
		expect(mockCarService.create).toHaveBeenCalledTimes(1);
	});
	it('should call carsService.getById once', async () => {
		const req = {
			params: viewCarFixture.params,
		} as unknown as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await carsController.getById(req, res);
		expect(mockCarService.getById).toHaveBeenCalledTimes(1);
	});

	it('should call carsService.getById and carsService.update once on success', async () => {
		const req: Request = {
			params: updateCarFixture.params,
			body: updateCarFixture.body,
		} as unknown as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		mockCarService.getById = jest
			.fn()
			.mockResolvedValueOnce(updateCarFixture.params);
		await carsController.update(req, res);
		expect(mockCarService.getById).toHaveBeenCalledWith(carID);
		expect(mockCarService.update).toHaveBeenCalledWith(
			carID,
			updateCarFixture.body
		);
	});

	it('should call carsService.getById and carsService.delete once on success', async () => {
		const req: Request = {
			params: { id: carID.toString() },
		} as unknown as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		mockCarService.getById = jest.fn().mockResolvedValueOnce(mockCarData);
		await carsController.delete(req, res);
		expect(mockCarService.getById).toHaveBeenCalledTimes(1);
		expect(mockCarService.getById).toHaveBeenCalledWith(carID);
		expect(mockCarService.delete).toHaveBeenCalledTimes(1);
		expect(mockCarService.delete).toHaveBeenCalledWith(carID);
	});
});
