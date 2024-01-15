import CustomerModel from './model/customerModel';
import { Application } from 'express';
import CustomerController from './controller/customerController';
import CustomerService from './service/customerService';
import CustomerRepository from './repository/customerRepository';

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
