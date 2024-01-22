import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import ConfigureDI from './config/di';
import { CarsModule } from './module/cars/CarModule';
import { RentModule } from './module/rents/RentModule';
import { CustomerModule } from './module/customers/CustomerModule';

async function init(): Promise<void> {
	try {
		dotenv.config();
		const app: Application = express();
		const PORT: number | string = process.env.PORT || 3000;

		app.use('/public', express.static('public'));
		app.use(express.json({ limit: '100mb' }));

		const config: ConfigureDI = new ConfigureDI();
		await config.init();

		const carsModule: CarsModule = new CarsModule();
		await carsModule.init(app, config.container);

		const customerModule: CustomerModule = new CustomerModule();
		await customerModule.init(app, config.container);

		const rentModule: RentModule = new RentModule();
		await rentModule.init(app, config.container);

		app.get('/', (req: Request, res: Response) => {
			res.send('Cars Rent Project');
		});

		app.listen(PORT, () => {
			console.log(`Servidor corriendo en el puerto ${PORT}`);
		});
	} catch (error) {
		console.log('ERROR EN APP.TS', error);
		throw new Error(error);
	}
}

init();
