import { CustomerModel } from '../customerModule';
import iCustomer from '../entity/iCustomer';

export default class CustomerRepository {
	private customerModel: typeof CustomerModel;

	constructor(customerModel: typeof CustomerModel) {
		this.customerModel = customerModel;
	}
	public async create(customer: any): Promise<iCustomer> {
		return this.customerModel.create(customer);
	}
	public async getAll(): Promise<iCustomer[]> {
		return this.customerModel.findAll();
	}
	public async getByID(customerId: number): Promise<iCustomer> {
		return this.customerModel.findOne({
			where: {
				id: customerId,
			},
		});
	}
	public async update(
		customerId: number,
		updatedCustomerData: iCustomer
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
