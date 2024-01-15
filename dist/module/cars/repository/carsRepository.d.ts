import { CarsModel } from '../module';
import iCar from '../entity/iCar';
export default class CarsRepository {
    private carModel;
    constructor(carModel: typeof CarsModel);
    create(car: any): Promise<iCar>;
    getAll(): Promise<iCar[]>;
    delete(carId: any): Promise<any>;
    getByID(carId: number): Promise<iCar>;
    update(carId: number, updatedCarData: iCar): Promise<any>;
}
//# sourceMappingURL=carsRepository.d.ts.map