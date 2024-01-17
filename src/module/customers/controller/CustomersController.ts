import AbstractController from '../../AbstractsController';
import { Application, Request, Response } from 'express';
import ICustomer from '../entity/Icustomers';
import { CustomerService } from '../CustomerModule';
import IResponse from '../entity/IcustomerResponse';
import { createCustomerValidations } from './validation/CustomerValidation';
import { validationResult } from 'express-validator';

export default class CustomerController extends AbstractController {
	public readonly ROUTE_BASE: string;
	private customerService: CustomerService;
	private response: IResponse = { status: true, errors: '', data: null };

	constructor(customerService: CustomerService) {
		super();
		this.ROUTE_BASE = '/customers';
		this.customerService = customerService;
	}
	public async configureRoutes(app: Application): Promise<void> {
		const ROUTE: string = this.ROUTE_BASE;
		app.post(`${ROUTE}`, this.create.bind(this));
		app.get(`${ROUTE}`, this.index.bind(this));
		app.get(`${ROUTE}/:id`, this.getById.bind(this));
		app.put(`${ROUTE}/:id`, this.update.bind(this));
		app.delete(`${ROUTE}/:id`, this.delete.bind(this));
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			this.response.data = await this.customerService.getAll();
			if (this.response.data) {
				this.response.status = true;
				res.status(200).json(this.response);
			}
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error retrieving customer information';
			res.status(500).json(this.response);
		}
	}
	public async getById(req: Request, res: Response): Promise<ICustomer> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			this.response.data = await this.customerService.getById(customerId);
			if (!this.response.data) {
				this.response.status = false;
				this.response.errors = `No customer found with the entered ID. ${customerId}`;
				res.status(404).json(this.response);
				this.response.errors = ``;
				return;
			}
			res.status(200).json(this.response);
		} catch (error) {
			this.response.status = false;
			this.response.errors = `Error fetching the customers with the entered ID.`;
			res.status(500).json(this.response);
			this.response.errors = ``;
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
				res.status(400).json({ errors: errors.array() });
				return;
			}
			const customer: ICustomer = req.body;
			this.response.data = await this.customerService.create(customer);
			res.status(201).json(this.response);
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error on customer creation';
			res.status(500).json(this.response);
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			if (isNaN(customerId)) {
				res.status(400).json({
					status: false,
					errors: 'Invalid ID',
				});
				return;
			}
			const car = await this.customerService.getById(customerId);
			if (!car) {
				res.status(404).json({
					status: false,
					errors: `Error fetching the customers with the entered ID ${customerId}`,
				});
				this.response.errors = ``;
				return;
			}
			await this.customerService.delete(customerId);
			res.json({
				status: true,
				message: 'Customer successfully deleted',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error deleting the customer.';
			res.status(500).json(this.response);
		}
	}
	public async update(req: Request, res: Response): Promise<void> {
		try {
			const customerId: number = parseInt(req.params.id, 10);
			if (isNaN(customerId)) {
				res.status(400).json({
					status: false,
					errors: 'Customer ID Invalid',
				});
				return;
			}
			this.response.data = await this.customerService.getById(customerId);
			if (!this.response.data) {
				res.status(404).json({
					status: false,
					errors: `Error fetching the customers with the entered ID ${customerId}`,
				});
				return;
			}
			const updatedCustomerData: ICustomer = req.body;
			this.response.data = await this.customerService.update(
				customerId,
				updatedCustomerData
			);
			res.status(200).json(this.response);
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error creating the customer.';
			res.status(500).json(this.response);
		}
	}
}
