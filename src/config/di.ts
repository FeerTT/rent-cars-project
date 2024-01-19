import { DIContainer } from 'rsdi';
import {
	CarsModule,
	CarsModel,
	CarsController,
	CarService,
	CarsRepository,
} from '../module/cars/CarsModule';
import {
	CustomerModule,
	CustomerController,
	CustomerModel,
	CustomerRepository,
	CustomerService,
} from '../module/customers/CustomerModule';
import {
	RentModule,
	RentController,
	RentModel,
	RentRepository,
	RentService,
} from '../module/rents/RentModule';
import { Sequelize } from 'sequelize-typescript';
import { initDB } from './init.db';

export default class ConfigureDI {
	public container: DIContainer;
	public sequelizeInstance: Sequelize;

	constructor() {
		this.container = new DIContainer();
	}

	public async initializeSequelize(): Promise<void> {
		this.sequelizeInstance = await initDB();
	}

	public addCarsDefinitions = (container: any) => {
		container
			.add('sequelize', () => this.sequelizeInstance)
			.add('carsModel', () => CarsModel)
			.add(
				'carRepository',
				({ carsModel }) => new CarsRepository(carsModel)
			)
			.add(
				'carsService',
				({ carRepository }) => new CarService(carRepository)
			)
			.add(
				'carsController',
				({ carsService }) => new CarsController(carsService)
			);
	};
	public addCustomerDefinitions = (container: DIContainer) => {
		container
			.add('customersModel', () => CustomerModel)
			.add(
				'customerRepository',
				({ customersModel }) => new CustomerRepository(customersModel)
			)
			.add(
				'customerService',
				({ customerRepository }) =>
					new CustomerService(customerRepository)
			)
			.add(
				'customerController',
				({ customerService }) => new CustomerController(customerService)
			);
	};

	public addRentsDefinitions = (container: any) => {
		const costumerModel = container.get('customersModel');
		const carsModel = container.get('carsModel');
		container
			.add('rentsModel', () => RentModel)
			.add(
				'rentsRepository',
				({ rentsModel, customersModel, carsModel }) =>
					new RentRepository(rentsModel, customersModel, carsModel)
			)
			.add(
				'rentsService',
				({ rentsRepository }) => new RentService(rentsRepository)
			)
			.add(
				'rentsController',
				({ rentsService }) => new RentController(rentsService)
			);
	};

	public init = async (): Promise<DIContainer> => {
		await this.initializeSequelize();
		this.addCarsDefinitions(this.container);
		this.addCustomerDefinitions(this.container);
		this.addRentsDefinitions(this.container);
		return this.container;
	};
}
