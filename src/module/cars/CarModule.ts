import CarsController from './controller/CarController';
import { Application } from 'express';
import CarService from './service/CarService';
import CarsRepository from './repository/CarRepository';
import CarModel from './model/CarModel';

class CarsModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { carsController } = container;
		await carsController.configureRoutes(app);
	};
}
export { CarModel, CarsModule, CarsController, CarService, CarsRepository };
