import { Request, Response } from 'express';
import { CustomerController, CustomerService } from '../../customerModule';
import {
	createCustomerFixture,
	viewCustomerFixture,
	updateCustomerFixture,
	customerID,
	customerData,
} from './fixtures/customerFixture';

describe('CustomerController', () => {
	let customerController: CustomerController;
	let mockCustomerService: CustomerService;
	beforeEach(() => {
		mockCustomerService = {
			create: jest.fn(),
			getAll: jest.fn(),
			delete: jest.fn(),
			update: jest.fn(),
			getById: jest.fn(),
		} as unknown as CustomerService;
		customerController = new CustomerController(mockCustomerService);
	});

	describe('index', () => {
		it('should call customerService.getAll once', async () => {
			const req = {} as Request;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			await customerController.index(req, res);
			expect(mockCustomerService.getAll).toHaveBeenCalledTimes(1);
		});
	});

	describe('create', () => {
		it('should call customerService.create once', async () => {
			const req = {
				body: createCustomerFixture.body,
			} as Request;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			await customerController.create(req, res);
			expect(mockCustomerService.create).toHaveBeenCalledTimes(1);
		});
	});

	describe('view', () => {
		it('should call customerService.getById once', async () => {
			const req = {
				params: viewCustomerFixture.params,
			} as unknown as Request;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			await customerController.view(req, res);
			expect(mockCustomerService.getById).toHaveBeenCalledTimes(1);
		});
	});

	describe('update', () => {
		it('should call customerService.getById and customerService.update once on success', async () => {
			const req: Request = {
				params: updateCustomerFixture.params,
				body: updateCustomerFixture.body,
			} as unknown as Request;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			mockCustomerService.getById = jest
				.fn()
				.mockResolvedValueOnce(updateCustomerFixture.params);
			await customerController.update(req, res);
			expect(mockCustomerService.getById).toHaveBeenCalledWith(
				customerID
			);
			expect(mockCustomerService.update).toHaveBeenCalledWith(
				customerID,
				updateCustomerFixture.body
			);
		});
	});

	describe('delete', () => {
		it('should call customerService.getById and customerService.delete once on success', async () => {
			const req: Request = {
				params: { id: customerID.toString() },
			} as unknown as Request;
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			} as unknown as Response;
			mockCustomerService.getById = jest
				.fn()
				.mockResolvedValueOnce(customerData);
			await customerController.delete(req, res);
			expect(mockCustomerService.getById).toHaveBeenCalledTimes(1);
			expect(mockCustomerService.getById).toHaveBeenCalledWith(
				customerID
			);
			expect(mockCustomerService.delete).toHaveBeenCalledTimes(1);
			expect(mockCustomerService.delete).toHaveBeenCalledWith(customerID);
		});
	});
});
