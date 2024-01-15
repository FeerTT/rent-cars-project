import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import ConfigureDI from './config/di';
import { CarsModule } from './module/cars/module';
import nunjucks from 'nunjucks';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CustomerModule } from './module/customers/customerModule';

async function init(): Promise<void> {
	try {
		dotenv.config();
		const app: Application = express();
		const PORT: number | string = process.env.PORT || 3000;
		const currentDir = dirname(fileURLToPath(import.meta.url));
		nunjucks.configure('src/module', {
			autoescape: true,
			express: app,
		});

		app.use('/public', express.static('public'));
		app.use(express.json({ limit: '100mb' }));

		const config: ConfigureDI = new ConfigureDI();
		await config.init();

		const carsModule: CarsModule = new CarsModule();
		await carsModule.init(app, config.container);

		const customerModule: CustomerModule = new CustomerModule();
		await customerModule.init(app, config.container);

		app.set('view engine', 'njk');
		app.set('views', join(currentDir, 'src/module'));

		app.get('/', (req: Request, res: Response) => {
			// res.send('hoolandaaa');
			res.render('views-layout/base');
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