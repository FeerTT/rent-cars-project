import CarController from './controller/CarController';
import { Application } from 'express';
import CarService from './service/CarService';
import CarRepository from './repository/CarRepository';
import CarModel from './model/CarModel';

class CarModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { carController } = container;
		await carController.configureRoutes(app);
	};
}
export { CarModel, CarModule, CarController, CarService, CarRepository };
