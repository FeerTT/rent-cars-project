import dotenv from 'dotenv';
import express from 'express';
import ConfigureDI from './config/di';
import { CarsModule } from './module/cars/module';
import nunjucks from 'nunjucks';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
async function init() {
    try {
        dotenv.config();
        const app = express();
        const PORT = process.env.PORT || 3000;
        const currentDir = dirname(fileURLToPath(import.meta.url));
        nunjucks.configure('src/module', {
            autoescape: true,
            express: app,
        });
        app.use('/public', express.static('public'));
        app.use(express.json({ limit: '100mb' }));
        const config = new ConfigureDI();
        await config.init();
        const carsModule = new CarsModule();
        await carsModule.init(app, config.container);
        app.set('view engine', 'njk');
        app.set('views', join(currentDir, 'src/module'));
        app.get('/', (req, res) => {
            // res.send('hoolandaaa');
            res.render('views-layout/base');
        });
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    }
    catch (error) {
        console.log('ERROR EN APP.TS', error);
        throw new Error(error);
    }
}
init();
//# sourceMappingURL=app.js.map