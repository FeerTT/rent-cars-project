import { DIContainer } from 'rsdi';
import { Sequelize } from 'sequelize-typescript';
import { CarsModule, CarsModel, CarsController, CarService, CarsRepository, } from '../module/cars/module';
export default class ConfigureDI {
    constructor() {
        this.carsModule = new CarsModule();
        this.init = async () => {
            await this.configureMainSequelizeDatabase();
            await this.configureModels();
            this.container = new DIContainer()
                .add('sequelize', () => this.configureMainSequelizeDatabase())
                .add('carsModel', () => CarsModel)
                .add('carRepository', ({ carsModel }) => new CarsRepository(carsModel))
                .add('carsService', ({ carRepository }) => new CarService(carRepository))
                .add('carsController', ({ carsService }) => new CarsController(carsService));
        };
        this.configureMainSequelizeDatabase = async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: process.env.DB_PATH || '',
                models: [CarsModel],
            });
            return sequelize;
        };
        this.configureModels = async () => {
            CarsModel.sync();
        };
    }
}
//# sourceMappingURL=di.js.map