import CarsModel from './model/carsModel';
import CarsController from './controller/carsController';
import CarService from './service/carsService';
import CarsRepository from './repository/carsRepository';
class CarsModule {
    constructor() {
        this.init = async (app, container) => {
            const { carsController } = container;
            await carsController.configureRoutes(app);
        };
    }
}
export { CarsModel, CarsModule, CarsController, CarService, CarsRepository };
//# sourceMappingURL=module.js.map