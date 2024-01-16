import { CustomerModel } from '../customerModule';
import ICustomer from '../entity/Icustomers';

export default class CustomerRepository {
	private customerModel: typeof CustomerModel;

	constructor(customerModel: typeof CustomerModel) {
		this.customerModel = customerModel;
	}
	public async create(customer: any): Promise<ICustomer> {
		return this.customerModel.create(customer);
	}
	public async getAll(): Promise<ICustomer[]> {
		return this.customerModel.findAll();
	}
	public async getByID(customerId: number): Promise<ICustomer> {
		return this.customerModel.findOne({
			where: {
				id: customerId,
			},
		});
	}
	public async update(
		customerId: number,
		updatedCustomerData: ICustomer
	): Promise<any> {
		return await this.customerModel.update(updatedCustomerData, {
			where: {
				id: customerId,
			},
		});
	}
	public async delete(customerId: any): Promise<any> {
		return this.customerModel.destroy({
			where: {
				id: customerId,
			},
		});
	}
}
