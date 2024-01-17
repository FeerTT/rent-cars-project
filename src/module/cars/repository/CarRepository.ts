import { CarsModel } from '../CarsModule';
import ICar from '../entity/ICar';

export default class CarsRepository {
	private carModel: typeof CarsModel;

	constructor(carModel: typeof CarsModel) {
		this.carModel = carModel;
	}
	public async create(car: any): Promise<ICar> {
		return this.carModel.create(car);
	}

	public async getAll(): Promise<ICar[]> {
		return this.carModel.findAll();
	}

	public async delete(carId: any): Promise<any> {
		return this.carModel.destroy({
			where: {
				id: carId,
			},
		});
	}
	public async getByID(carId: number): Promise<ICar> {
		return this.carModel.findOne({
			where: {
				id: carId,
			},
		});
	}

	public async update(carId: number, updatedCarData: ICar): Promise<any> {
		return await this.carModel.update(updatedCarData, {
			where: {
				id: carId,
			},
		});
	}
}
