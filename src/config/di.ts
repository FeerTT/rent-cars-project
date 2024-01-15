import { DIContainer } from 'rsdi';
import { Sequelize } from 'sequelize-typescript';
import {
	CarsModule,
	CarsModel,
	CarsController,
	CarService,
	CarsRepository,
} from '../module/cars/module';
import {
	CustomerModule,
	CustomerController,
	CustomerModel,
	CustomerRepository,
	CustomerService,
} from '../module/customers/customerModule';

export default class ConfigureDI {
	private carsModule: CarsModule = new CarsModule();
	//public container: DIcontainer
	public container: any;

	public init = async (): Promise<void> => {
		await this.configureMainSequelizeDatabase();
		await this.configureModels();
		this.container = new DIContainer()
			.add('sequelize', () => this.configureMainSequelizeDatabase())
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
			)
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
	private configureMainSequelizeDatabase = async (): Promise<Sequelize> => {
		const sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: process.env.DB_PATH || '',
			models: [CarsModel, CustomerModel],
		});
		return sequelize;
	};

	private configureModels = async (): Promise<void> => {
		CarsModel.sync();
		CustomerModel.sync();
	};
}
