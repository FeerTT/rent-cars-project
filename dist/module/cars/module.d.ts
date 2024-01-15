import CarsModel from './model/carsModel';
import CarsController from './controller/carsController';
import { Application } from 'express';
import CarService from './service/carsService';
import CarsRepository from './repository/carsRepository';
declare class CarsModule {
    constructor();
    init: (app: Application, container: any) => Promise<void>;
}
export { CarsModel, CarsModule, CarsController, CarService, CarsRepository };
//# sourceMappingURL=module.d.ts.map