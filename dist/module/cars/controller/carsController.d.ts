import AbstractController from '../../abstractController';
import { Request, Response, Application } from 'express';
import iCar from '../entity/iCar';
import { CarService } from '../module';
export default class CarsController extends AbstractController {
    readonly ROUTE_BASE: string;
    private response;
    private carsService;
    constructor(carsService: CarService);
    configureRoutes(app: Application): Promise<void>;
    index(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    view(req: Request, res: Response): Promise<iCar>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=carsController.d.ts.map