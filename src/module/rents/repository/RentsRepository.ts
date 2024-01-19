import { CarsModel } from '../../cars/CarsModule';
import { CustomerModel } from '../../customers/CustomerModule';
import { RentModel } from '../RentModule';
import IRent from '../entity/IRent';

export default class RentRepository {
	private rentsModel: typeof RentModel;
	private customersModel: typeof CustomerModel;
	private carsModel: typeof CarsModel;
	constructor(
		rentsModel: typeof RentModel,
		customersModel: typeof CustomerModel,
		carsModel: typeof CarsModel
	) {
		this.customersModel = customersModel;
		this.rentsModel = rentsModel;
		this.carsModel = carsModel;
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
			include: [
				{
					model: this.customersModel,
					attributes: [
						'firstName',
						'lastName',
						'documentType',
						'documentNumber',
						'nationality',
						'address',
						'phone',
						'email',
					],
				},
				{
					model: this.carsModel,
					attributes: [
						'brand',
						'model',
						'year',
						'kms',
						'color',
						'air_conditioning',
						'passengers',
						'transmission',
					],
				},
			],
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
