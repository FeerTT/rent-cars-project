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
		app.get(`${ROUTE}/create`, (req, res) => {
			res.render('cars/view/create');
		});
		app.post(`${ROUTE}/create`, this.create.bind(this));
		app.get(`${ROUTE}`, this.index.bind(this));
		app.get(`${ROUTE}/view/:id`, this.view.bind(this));
		app.put(`${ROUTE}/update/:id`, this.update.bind(this));
		app.delete(`${ROUTE}/delete/:id`, this.delete.bind(this));
	}

	public async index(req: Request, res: Response): Promise<void> {
		try {
			const carsData = await this.carsService.getAll();
			res.render('cars/view/index', { carsData });
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error al obtener todos los autos';
			res.status(500).json(this.response);
		}
	}
	// public async index(req: Request, res: Response): Promise<void> {
	// 	try {
	// 		this.response.data = await this.carsService.getAll();
	// 		// res.render('cars/view/index');
	// 		res.json(this.response);
	// 	} catch (error) {
	// 		this.response.status = false;
	// 		this.response.errors = 'Error al obtener todos los autos';
	// 		res.status(500).json(this.response);
	// 	}
	// }

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
			console.log(car, 'CL DE CAR LO QUE RECIBO');
			const newCar = await this.carsService.create(car);
			res.status(201).json({ success: true, newCar });
		} catch (error) {
			this.response.status = false;
			//console.log(error, 'cl de error');
			this.response.errors = 'Error al crear el auto';
			res.status(500).json(this.response);
		}
	}

	public async view(req: Request, res: Response): Promise<iCar> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			const carById = await this.carsService.getById(carId);
			if (!carById) {
				this.response.status = false;
				this.response.errors = `No se encontró ningún auto con ID ${carId}`;
				res.status(404).json(this.response);
				return;
			}
			res.json({
				status: true,
				data: carById,
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = `Error al obtener el auto con id ingresado`;
			res.status(500).json(this.response);
		}
	}

	public async update(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					status: false,
					errors: 'ID de auto inválido',
				});
				return;
			}
			const car = await this.carsService.getById(carId);
			if (!car) {
				res.status(404).json({
					status: false,
					errors: `No se encontró ningún auto con ID ${carId}`,
				});
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
				message: 'Auto actualizado exitosamente',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error al crear el auto';
			res.status(500).json(this.response);
		}
	}

	public async delete(req: Request, res: Response): Promise<void> {
		try {
			const carId: number = parseInt(req.params.id, 10);
			if (isNaN(carId)) {
				res.status(400).json({
					status: false,
					errors: 'ID de auto inválido',
				});
				return;
			}
			const car = await this.carsService.getById(carId);
			if (!car) {
				res.status(404).json({
					status: false,
					errors: `No se encontró ningún auto con ID ${carId}`,
				});
				return;
			}
			await this.carsService.delete(carId);
			res.json({
				status: true,
				message: 'Auto Eliminado exitosamente',
			});
		} catch (error) {
			this.response.status = false;
			this.response.errors = 'Error al eliminar el auto';
			res.status(500).json(this.response);
		}
	}
}
