import AbstractController from '../../AbstractsController';
import { Application, Request, Response } from 'express';
import IResponse from '../entity/IRentResponse';
import RentService from '../service/RentsService';
import IRent from '../entity/IRent';
import {
	CreateRentValidation,
	UpdateRentValidation,
} from './validations/RentsValidation';
import { validationResult } from 'express-validator';

export default class RentController extends AbstractController {
	public readonly ROUTE_BASE: string;
	private response: IResponse = { status: true, errors: '', data: null };
	private rentService: RentService;
	constructor(rentService: RentService) {
		super();
		this.ROUTE_BASE = '/rents';
		this.rentService = rentService;
	}
	public async configureRoutes(app: Application): Promise<void> {
		const ROUTE: string = this.ROUTE_BASE;
		app.post(`${ROUTE}`, this.create.bind(this));
		app.get(`${ROUTE}`, this.index.bind(this));
		app.get(`${ROUTE}/:id`, this.getById.bind(this));
		app.put(`${ROUTE}/:id`, this.update.bind(this));
		app.delete(`${ROUTE}/:id`, this.delete.bind(this));
	}
	public async create(req: Request, res: Response): Promise<void> {
		try {
			await Promise.all(
				CreateRentValidation.map((validation) => validation.run(req))
			);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
				return;
			}

			const rent: IRent = req.body;
			this.response.data = await this.rentService.create(rent);
			res.status(201).json(this.response);
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error creating the rent';
			res.status(500).json(this.response);
		}
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			this.response.data = await this.rentService.getAll();
			if (this.response.data) {
				this.response.status = true;
				res.status(200).json(this.response);
			}
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error getting all the rents';
			res.status(500).json(this.response);
		}
	}

	public async getById(req: Request, res: Response): Promise<IRent> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			this.response.data = await this.rentService.getById(rentId);
			if (!this.response.data) {
				this.response.status = false;
				this.response.errors = `No rent found with ID ${rentId}`;
				res.status(404).json(this.response);
				this.response.errors = ``;
				return;
			}
			res.json({
				status: true,
				data: this.response.data,
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = `Error getting the rent with the entered ID`;
			res.status(500).json(this.response);
			this.response.errors = '';
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			if (isNaN(rentId)) {
				res.status(400).json({
					status: false,
					errors: 'Invalid rent ID',
				});
				return;
			}
			await Promise.all(
				UpdateRentValidation.map((validation) => validation.run(req))
			);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
				return;
			}
			this.response.data = await this.rentService.getById(rentId);
			if (!this.response.data) {
				res.status(404).json({
					status: false,
					errors: `No rent was found with ID ${rentId}`,
				});
				return;
			}

			const updatedRentData: IRent = req.body;
			await this.rentService.update(rentId, updatedRentData);

			res.status(200).json({
				status: true,
				message: 'Rent updated successfully',
			});
		} catch (error) {
			res.status(500).json({
				status: false,
				errors: 'Error updating the rent.',
			});
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			if (isNaN(rentId)) {
				res.status(400).json({
					status: false,
					errors: 'Invalid rent ID.',
				});
				return;
			}
			this.response.data = await this.rentService.getById(rentId);
			if (!this.response.data) {
				res.status(404).json({
					status: false,
					errors: `No rent was found with ID ${rentId}`,
				});
				this.response.errors = ``;
				return;
			}
			await this.rentService.delete(rentId);
			res.json({
				status: true,
				message: 'Rent deleted successfully',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error deleting the rent.';
			res.status(500).json(this.response);
		}
	}
}
