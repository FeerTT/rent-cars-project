import AbstractController from '../../AbstractsController';
import { Application, Request, Response } from 'express';
import RentService from '../service/RentService';
import IRent from '../entity/IRent';
import {
	CreateRentValidation,
	UpdateRentValidation,
} from './validations/RentsValidation';
import { validationResult } from 'express-validator';

export default class RentController extends AbstractController {
	public readonly ROUTE_BASE: string;

	private rentService: RentService;
	constructor(rentService: RentService) {
		super();
		this.ROUTE_BASE = '/rents';
		this.rentService = rentService;
	}
	public async configureRoutes(app: Application): Promise<void> {
		const ROUTE: string = this.ROUTE_BASE;
		app.post(`${ROUTE}`, this.create.bind(this));
		app.get(`${ROUTE}`, this.getAll.bind(this));
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
				res.status(400).json(errors.array());
				return;
			}
			const rentData: IRent = req.body;
			const createdRent = await this.rentService.create(rentData);
			const rentWithDetails = await this.rentService.getById(
				createdRent.id
			);
			res.status(201).json(rentWithDetails);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error creating the rent' });
		}
	}

	public async getAll(req: Request, res: Response): Promise<void> {
		try {
			const rents = await this.rentService.getAll();
			if (rents) {
				res.status(200).json({ data: rents });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: 'Error getting all the rents',
			});
		}
	}

	public async getById(req: Request, res: Response): Promise<void> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			const rent = await this.rentService.getById(rentId);
			if (!rent) {
				res.status(404).json({
					errors: `No rent found with ID ${rentId}`,
				});
				return;
			}
			res.json({
				data: rent,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error getting the rent with the entered ID',
			});
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			if (isNaN(rentId)) {
				res.status(400).json({
					errors: 'Invalid rent ID',
				});
				return;
			}
			await Promise.all(
				UpdateRentValidation.map((validation) => validation.run(req))
			);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({
					errors: errors.array(),
				});
				return;
			}
			const existingRent = await this.rentService.getById(rentId);
			if (!existingRent) {
				res.status(404).json({
					errors: `No rent was found with ID ${rentId}`,
				});
				return;
			}
			const updatedRentData: IRent = req.body;
			await this.rentService.update(rentId, updatedRentData);
			res.status(200).json({
				data: updatedRentData,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error updating the rent.',
			});
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const rentId: number = parseInt(req.params.id, 10);
			if (isNaN(rentId)) {
				res.status(400).json({
					errors: 'Invalid rent ID.',
				});
				return;
			}
			const existingRent = await this.rentService.getById(rentId);
			if (!existingRent) {
				res.status(404).json({
					errors: `No rent was found with ID ${rentId}`,
				});
				return;
			}
			await this.rentService.delete(rentId);
			res.json({
				message: 'Rent deleted successfully',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				errors: 'Error deleting the rent.',
			});
		}
	}
}
