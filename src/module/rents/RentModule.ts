import RentModel from './model/RentsModel';
import RentController from './controller/RentsController';
import RentService from './service/RentsService';
import RentRepository from './repository/RentsRepository';
import { Application } from 'express';
class RentModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { rentsController } = container;
		await rentsController.configureRoutes(app);
	};
}

export { RentModel, RentModule, RentController, RentService, RentRepository };
