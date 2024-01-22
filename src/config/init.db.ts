import { Sequelize } from 'sequelize-typescript';
import { CarModel } from '../module/cars/CarModule';
import { CustomerModel } from '../module/customers/CustomerModule';
import { RentModel } from '../module/rents/RentModule';

const configureMainSequelizeDatabase = async (): Promise<Sequelize> => {
	const sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: process.env.DB_PATH || '',
		models: [CarModel, CustomerModel, RentModel],
	});
	await sequelize.sync();
	return sequelize;
};

export const initDB = async (): Promise<Sequelize> => {
	const sequelizeInstance = await configureMainSequelizeDatabase();
	return sequelizeInstance;
};
