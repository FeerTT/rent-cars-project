import { CustomerRepository } from '../CustomerModule';
import ICustomer from '../entity/Icustomers';

export default class CustomerService {
	public customerRepository: CustomerRepository;

	constructor(customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository;
	}
	public async create(customer: ICustomer): Promise<ICustomer> {
		return await this.customerRepository.create(customer);
	}
	public async getAll(): Promise<ICustomer[]> {
		return await this.customerRepository.getAll();
	}
	public async getById(customerId: number): Promise<any> {
		const customer = await this.customerRepository.getByID(customerId);
		return customer;
	}
	public async update(
		customerId: number,
		updatedCustomerData: ICustomer
	): Promise<void> {
		await this.customerRepository.update(customerId, updatedCustomerData);
	}
	public async delete(customerId: number): Promise<void> {
		await this.customerRepository.delete(customerId);
	}
}
