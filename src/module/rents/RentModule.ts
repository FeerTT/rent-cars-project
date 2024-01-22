import RentModel from './model/RentModel';
import RentController from './controller/RentController';
import RentService from './service/RentService';
import RentRepository from './repository/RentRepository';
import { Application } from 'express';
class RentModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { rentController } = container;
		await rentController.configureRoutes(app);
	};
}

export { RentModel, RentModule, RentController, RentService, RentRepository };
