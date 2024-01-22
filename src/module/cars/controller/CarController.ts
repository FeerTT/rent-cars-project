import AbstractController from '../../AbstractsController';
import { Request, Response, Application } from 'express';
import ICar from '../entity/ICar';
import { CarService } from '../CarModule';
import { body, validationResult } from 'express-validator';
import {
	CreateCarValidation,
	updateCarValidations,
} from './validation/validations';

export default class CarsController extends AbstractController {
	public readonly ROUTE_BASE: string;
	private carsService: CarService;

	constructor(carsService: CarService) {
		super();
		this.ROUTE_BASE = '/cars';
		this.carsService = carsService;
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
			const response = await this.carsService.getAll();
			if (response) {
				res.status(200).json(response);
			}
		} catch (error) {
			res.status(500).json({
				errors: 'Error getting all the cars:',
			});
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
			const car: ICar = req.body;
			const createdCar = await this.carsService.create(car);
			res.status(201).json({
				data: createdCar,
				message: 'Car created successfully',
			});
		} catch (error) {
			console.error('Error creating the car:', error);
			res.status(500).json({
				errors: 'Error creating the car',
			});
		}
	}

	public async getById(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId) || carId <= 0) {
				res.status(400).json({
					errors: 'Invalid car ID',
				});
				return;
			}
			const car = await this.carsService.getById(carId);
			if (!car) {
				res.status(404).json({
					errors: `No car found with ID ${carId}`,
				});
				return;
			}
			res.status(200).json({
				data: car,
			});
		} catch (error) {
			console.error('Error getting the car with the entered ID:', error);
			res.status(500).json({
				errors: 'Error getting the car with the entered ID',
			});
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					errors: 'Invalid car ID',
				});
				return;
			}
			const existingCar = await this.carsService.getById(carId);
			if (!existingCar) {
				res.status(404).json({
					errors: `No car was found with ID ${carId}`,
				});
				return;
			}
			await Promise.all(
				updateCarValidations.map((validation) => validation.run(req))
			);
			const updateErrors = validationResult(req);
			if (!updateErrors.isEmpty()) {
				res.status(400).json({
					errors: updateErrors.array(),
				});
				return;
			}
			const updatedCarData: ICar = req.body;
			await this.carsService.update(carId, updatedCarData);
			res.status(200).json({
				message: 'Car updated successfully',
			});
		} catch (error) {
			console.error('Error updating the car:', error);
			res.status(500).json({
				errors: 'Error updating the car',
			});
		}
	}
	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					errors: 'Invalid car ID',
				});
				return;
			}
			const carToDelete = await this.carsService.getById(carId);
			if (!carToDelete) {
				res.status(404).json({
					errors: `No car was found with ID ${carId}`,
				});
				return;
			}
			await this.carsService.delete(carId);
			res.json({
				message: 'Car deleted successfully',
			});
		} catch (error) {
			console.error('Error deleting the car:', error);
			res.status(500).json({
				errors: 'Error deleting the car',
			});
		}
	}
}
