import { Model } from 'sequelize-typescript';
export default class CarsModel extends Model {
    brand: string;
    model: string;
    year: number;
    kms: number;
    color: string;
    air_conditioning: boolean;
    passengers: number;
    transmission: string;
}
//# sourceMappingURL=carsModel.d.ts.map