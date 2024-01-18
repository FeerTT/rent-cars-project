import { RentModel } from '../RentModule';
import IRent from '../entity/IRent';

export default class RentRepository {
	private rentsModel: typeof RentModel;
	constructor(rentsModel: typeof RentModel) {
		this.rentsModel = rentsModel;
	}
	public async create(rent: any): Promise<IRent> {
		return this.rentsModel.create(rent);
	}
	public async getAll(): Promise<IRent[]> {
		return this.rentsModel.findAll();
	}
	public async getById(rentId: number): Promise<IRent> {
		return this.rentsModel.findOne({
			where: {
				id: rentId,
			},
		});
	}
	public async delete(rentId: number): Promise<any> {
		return this.rentsModel.destroy({
			where: {
				id: rentId,
			},
		});
	}
	public async update(rentId: number, updatedRentData: any): Promise<any> {
		return await this.rentsModel.update(updatedRentData, {
			where: {
				id: rentId,
			},
		});
	}
}
