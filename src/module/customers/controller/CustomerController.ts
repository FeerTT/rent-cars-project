import AbstractController from '../../AbstractsController';
import { Application, Request, Response } from 'express';
import ICustomer from '../entity/ICustomers';
import { CustomerService } from '../CustomerModule';
import { createCustomerValidations } from './validation/CustomerValidation';
import { validationResult } from 'express-validator';

export default class CustomerController extends AbstractController {
	public readonly ROUTE_BASE: string;
	private customerService: CustomerService;

	constructor(customerService: CustomerService) {
		super();
		this.ROUTE_BASE = '/customers';
		this.customerService = customerService;
	}
	public async configureRoutes(app: Application): Promise<void> {
		const ROUTE: string = this.ROUTE_BASE;
		app.post(`${ROUTE}`, this.create.bind(this));
		app.get(`${ROUTE}`, this.getAll.bind(this));
		app.get(`${ROUTE}/:id`, this.getById.bind(this));
		app.put(`${ROUTE}/:id`, this.update.bind(this));
		app.delete(`${ROUTE}/:id`, this.delete.bind(this));
	}

	public async getAll(req: Request, res: Response): Promise<void> {
		try {
			const response = await this.customerService.getAll();
			if (response && response.length > 0) {
				res.status(200).json(response);
			}
		} catch (error) {
			console.error('Error retrieving customer information', error);
			res.status(500).json({
				errors: 'Error retrieving customer information',
			});
		}
	}
	public async getById(req: Request, res: Response): Promise<void> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			const customerData = await this.customerService.getById(customerId);
			if (!customerData) {
				res.status(404).json({
					errors: `No customer found with the entered ID. ${customerId}`,
				});
				return;
			}
			res.status(200).json({
				data: customerData,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: `Error fetching the customer with the entered ID.`,
			});
		}
	}
	public async create(req: Request, res: Response): Promise<void> {
		try {
			await Promise.all(
				createCustomerValidations.map((validation) =>
					validation.run(req)
				)
			);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					status: false,
					errors: errors.array(),
					data: null,
				});
				return;
			}
			const customer: ICustomer = req.body;
			const createdCustomer = await this.customerService.create(customer);
			res.status(201).json({
				data: createdCustomer,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error on customer creation',
			});
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			if (isNaN(customerId)) {
				res.status(400).json({
					errors: 'Invalid ID',
				});
				return;
			}
			const customer = await this.customerService.getById(customerId);
			if (!customer) {
				res.status(404).json({
					errors: `No customer found with the entered ID ${customerId}`,
				});
				return;
			}
			await this.customerService.delete(customerId);
			res.json({
				message: 'Customer successfully deleted',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error deleting the customer.',
			});
		}
	}
	public async update(req: Request, res: Response): Promise<void> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			if (isNaN(customerId)) {
				res.status(400).json({
					errors: 'Customer ID Invalid',
				});
				return;
			}
			const existingCustomer =
				await this.customerService.getById(customerId);
			if (!existingCustomer) {
				res.status(404).json({
					errors: `No customer found with the entered ID ${customerId}`,
				});
				return;
			}
			const updatedCustomerData: ICustomer = req.body;
			await this.customerService.update(customerId, updatedCustomerData);
			res.status(200).json({
				data: updatedCustomerData,
				message: 'Customer successfully updated',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error updating the customer.',
			});
		}
	}
}
