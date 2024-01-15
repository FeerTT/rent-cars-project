import AbstractController from '../../abstractController';
import { Request, Response, Application } from 'express';
import iCar from '../entity/iCar';
import { CarService } from '../module';
import iResponse from '../entity/iResponse';
import { body, validationResult } from 'express-validator';
import { CreateCarValidation, updateCarValidations } from './error/validations';

export default class CarsController extends AbstractController {
	public readonly ROUTE_BASE: string;
	private response: iResponse = { status: true, errors: '', data: null };

	private carsService: CarService;

	constructor(carsService: CarService) {
		super();
		this.ROUTE_BASE = '/cars';
		this.carsService = carsService;
	}

	public async configureRoutes(app: Application): Promise<void> {
		const ROUTE: string = this.ROUTE_BASE;
		app.post(`${ROUTE}/create`, this.create.bind(this));
		app.get(`${ROUTE}`, this.index.bind(this));
		app.get(`${ROUTE}/view/:id`, this.view.bind(this));
		app.put(`${ROUTE}/update/:id`, this.update.bind(this));
		app.delete(`${ROUTE}/delete/:id`, this.delete.bind(this));
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			this.response.data = await this.carsService.getAll();
			if (this.response.data) {
				this.response.status = true;
				res.status(200).json(this.response);
			}
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error getting all the cars';
			res.status(500).json(this.response);
		}
	}

	public async create(req: Request, res: Response): Promise<void> {
		try {
			await Promise.all(
				CreateCarValidation.map((validation) => validation.run(req))
			);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array() });
				return;
			}
			const car: iCar = req.body;
			this.response.data = await this.carsService.create(car);
			res.status(201).json(this.response);
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error creating the car';
			res.status(500).json(this.response);
		}
	}

	public async view(req: Request, res: Response): Promise<iCar> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			this.response.data = await this.carsService.getById(carId);
			if (!this.response.data) {
				this.response.status = false;
				this.response.errors = `No car found with ID ${carId}`;
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
			this.response.errors = `Error getting the car with the entered ID`;
			res.status(500).json(this.response);
			this.response.errors = '';
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					status: false,
					errors: 'Invalid car ID',
				});
				this.response.errors = ``;
				return;
			}
			this.response.data = await this.carsService.getById(carId);
			if (this.response.data.length === 0) {
				res.status(404).json({
					status: false,
					errors: `No car was found with ID ${carId}`,
				});
				this.response.errors = ``;
				return;
			}
			await Promise.all(
				updateCarValidations.map((validation) => validation.run(req))
			);
			const updateErrors = validationResult(req);
			if (!updateErrors.isEmpty()) {
				res.status(400).json({ errors: updateErrors.array() });
				return;
			}
			const updatedCarData: iCar = req.body;
			this.response.data = await this.carsService.update(
				carId,
				updatedCarData
			);
			res.json({
				status: true,
				message: 'Car updated successfully',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error creating the car.';
			res.status(500).json(this.response);
			this.response.errors = ``;
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					status: false,
					errors: 'Invalid car ID.',
				});
				return;
			}
			this.response.data = await this.carsService.getById(carId);
			if (!this.response.data) {
				res.status(404).json({
					status: false,
					errors: `No car was found with ID ${carId}`,
				});
				this.response.errors = ``;
				return;
			}
			await this.carsService.delete(carId);
			res.json({
				status: true,
				message: 'Car deleted successfully',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error deleting the car.';
			res.status(500).json(this.response);
		}
	}
}
