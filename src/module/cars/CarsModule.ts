import CarsModel from './model/CarModel';
import CarsController from './controller/CarController';
import { Application } from 'express';
import CarService from './service/CarService';
import CarsRepository from './repository/CarRepository';

class CarsModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { carsController } = container;
		await carsController.configureRoutes(app);
	};
}
export { CarsModel, CarsModule, CarsController, CarService, CarsRepository };
