import { RentController, RentService } from '../../RentModule';
import { Request, Response } from 'express';
import {
	createRentFixture,
	updateRentFixture,
	rentID,
} from './fixtures/TestRentsController';
describe('RentsController', () => {
	const mockRentService = {
		create: jest.fn(),
		getAll: jest.fn(),
		delete: jest.fn(),
		update: jest.fn(),
		getById: jest.fn(),
	} as unknown as RentService;
	const rentsController = new RentController(mockRentService);

	it('should call rentService.getAll once', async () => {
		const req = {} as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await rentsController.getAll(req, res);
		expect(mockRentService.getAll).toHaveBeenCalledTimes(1);
	});

	it('should call rentService.create once', async () => {
		const req = {
			body: createRentFixture.body,
		} as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await rentsController.create(req, res);
		expect(mockRentService.create).toHaveBeenCalledTimes(1);
	});

	it('should call rentService.getById once', async () => {
		const req = {
			params: 1,
		} as unknown as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		await rentsController.getById(req, res);
		expect(mockRentService.getById).toHaveBeenCalledTimes(1);
	});

	it('should call rentService.getById and rentService.update once on success', async () => {
		const req: Request = {
			params: updateRentFixture.params,
			body: updateRentFixture.body,
		} as unknown as Request;

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;

		mockRentService.getById = jest
			.fn()
			.mockResolvedValueOnce(updateRentFixture.params);
		await rentsController.update(req, res);
		expect(mockRentService.getById).toHaveBeenCalledWith(rentID);
		expect(mockRentService.update).toHaveBeenCalledWith(
			rentID,
			updateRentFixture.body
		);
	});

	it('should call rentService.getById and rentService.delete once on success', async () => {
		const req: Request = {
			params: { id: rentID },
		} as unknown as Request;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
		mockRentService.getById = jest
			.fn()
			.mockResolvedValueOnce(createRentFixture.body);
		await rentsController.delete(req, res);
		expect(mockRentService.getById).toHaveBeenCalledTimes(1);
		expect(mockRentService.getById).toHaveBeenCalledWith(rentID);
		expect(mockRentService.delete).toHaveBeenCalledTimes(1);
		expect(mockRentService.delete).toHaveBeenCalledWith(rentID);
	});
});
