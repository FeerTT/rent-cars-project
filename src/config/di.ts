import { DIContainer } from 'rsdi';
import {
	CarsModule,
	CarModel,
	CarsController,
	CarService,
	CarsRepository,
} from '../module/cars/CarModule';
import {
	CustomerModule,
	CustomerController,
	CustomerRepository,
	CustomerService,
	CustomerModel,
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

	public addCarDefinitions = (container: any) => {
		container
			.add('sequelize', () => this.sequelizeInstance)
			.add('carsModel', () => CarModel)
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
	public addCustomerDefinitions = (container: any) => {
		container
			.add('customersModel', () => CustomerModel)
			.add(
				'customerRepository',
				({ customersModel }) => new CustomerRepository(CustomerModel)
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

	public addRentDefinitions = (container: any) => {
		container.get('carsModel');
		container.get('customersModel');
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
		this.addCarDefinitions(this.container);
		this.addCustomerDefinitions(this.container);
		this.addRentDefinitions(this.container);
		return this.container;
	};
}
