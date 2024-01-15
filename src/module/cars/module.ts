import CarsModel from './model/carsModel';
import CarsController from './controller/carsController';
import { Application } from 'express';
import CarService from './service/carsService';
import CarsRepository from './repository/carsRepository';

class CarsModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { carsController } = container;
		await carsController.configureRoutes(app);
	};
}
export { CarsModel, CarsModule, CarsController, CarService, CarsRepository };
