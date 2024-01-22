import { CarModel } from '../../cars/CarModule';
import { CustomerModel } from '../../customers/CustomerModule';
import { RentModel } from '../RentModule';
import IRent from '../entity/IRent';

export default class RentRepository {
	private rentModel: typeof RentModel;
	private customerModel: typeof CustomerModel;
	private carModel: typeof CarModel;
	constructor(
		rentModel: typeof RentModel,
		customerModel: typeof CustomerModel,
		carModel: typeof CarModel
	) {
		this.customerModel = customerModel;
		this.rentModel = rentModel;
		this.carModel = carModel;
	}

	public async create(rent: any): Promise<IRent> {
		return this.rentModel.create(rent);
	}
	public async getAll(): Promise<IRent[]> {
		return this.rentModel.findAll();
	}
	public async getById(rentId: number): Promise<IRent> {
		return this.rentModel.findOne({
			where: {
				id: rentId,
			},
			include: [
				{
					model: this.customerModel,
					attributes: [
						'firstName',
						'lastName',
						'documentType',
						'documentNumber',
						'nationality',
						'address',
						'phone',
						'email',
						'birthDate',
					],
				},
				{
					model: this.carModel,
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
		return this.rentModel.destroy({
			where: {
				id: rentId,
			},
		});
	}
	public async update(rentId: number, updatedRentData: any): Promise<any> {
		return await this.rentModel.update(updatedRentData, {
			where: {
				id: rentId,
			},
		});
	}
}
