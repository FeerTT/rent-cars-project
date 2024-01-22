import CustomerModel from './model/CustomerModel';
import { Application } from 'express';
import CustomerController from './controller/CustomerController';
import CustomerService from './service/CustomerService';
import CustomerRepository from './repository/CustomerRepository';

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
