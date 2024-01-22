import { DIContainer } from 'rsdi';
import {
	CarModel,
	CarController,
	CarService,
	CarRepository,
} from '../module/cars/CarModule';
import {
	CustomerController,
	CustomerRepository,
	CustomerService,
	CustomerModel,
} from '../module/customers/CustomerModule';
import {
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
			.add('carModel', () => CarModel)
			.add('carRepository', ({ carModel }) => new CarRepository(carModel))
			.add(
				'carService',
				({ carRepository }) => new CarService(carRepository)
			)
			.add(
				'carController',
				({ carService }) => new CarController(carService)
			);
	};
	public addCustomerDefinitions = (container: any) => {
		container
			.add('customerModel', () => CustomerModel)
			.add(
				'customerRepository',
				({ customerModel }) => new CustomerRepository(customerModel)
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
		container.get('carModel');
		container.get('customerModel');
		container
			.add('rentModel', () => RentModel)
			.add(
				'rentRepository',
				({ rentModel, customerModel, carModel }) =>
					new RentRepository(rentModel, customerModel, carModel)
			)
			.add(
				'rentService',
				({ rentRepository }) => new RentService(rentRepository)
			)
			.add(
				'rentController',
				({ rentService }) => new RentController(rentService)
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
