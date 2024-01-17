import CustomerModel from './model/CustomersModel';
import { Application } from 'express';
import CustomerController from './controller/CustomersController';
import CustomerService from './service/CustomersService';
import CustomerRepository from './repository/CustomersRepository';

class CustomerModule {
	constructor() {}
	public init = async (app: Application, container: any) => {
		const { customerController } = container;
		await customerController.configureRoutes(app);
	};
}

export {
	CustomerModel,
	CustomerModule,
	CustomerController,
	CustomerService,
	CustomerRepository,
};
