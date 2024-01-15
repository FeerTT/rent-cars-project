import iCar from '../entity/iCar';
import { CarsRepository } from '../module';
export default class CarService {
    carRepository: CarsRepository;
    constructor(carRepository: CarsRepository);
    create(car: iCar): Promise<iCar>;
    getAll(): Promise<iCar[]>;
    delete(carId: number): Promise<void>;
    update(carId: number, updatedCarData: iCar): Promise<void>;
    getById(carId: number): Promise<any>;
}
//# sourceMappingURL=carsService.d.ts.map