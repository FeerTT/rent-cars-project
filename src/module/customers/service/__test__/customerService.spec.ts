import { CustomerRepository, CustomerService } from '../../CustomerModule';
import {
	createdCustomer,
	customer,
	customerList,
	updatedCustomerData,
} from './fixtures/TestServiceData';

describe('CustomerService', () => {
	const mockCustomerRepository = {
		getByID: jest.fn(),
		create: jest.fn(),
		getAll: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	} as unknown as CustomerRepository;
	const customerService = new CustomerService(mockCustomerRepository);

	it('should create a customer successfully', async () => {
		(mockCustomerRepository.create as jest.Mock).mockResolvedValueOnce(
			createdCustomer
		);
		const result = await customerService.create(customer);
		expect(mockCustomerRepository.create).toHaveBeenCalledWith(customer);
		expect(result).toEqual(createdCustomer);
	});

	it('should get all customers successfully', async () => {
		(mockCustomerRepository.getAll as jest.Mock).mockResolvedValueOnce(
			customerList
		);
		const result = await customerService.getAll();
		expect(mockCustomerRepository.getAll).toHaveBeenCalled();
		expect(result).toEqual(customerList);
	});

	it('should get a customer by ID successfully', async () => {
		(mockCustomerRepository.getByID as jest.Mock).mockResolvedValueOnce(
			createdCustomer
		);
		const result = await customerService.getById(1);
		expect(mockCustomerRepository.getByID).toHaveBeenCalledWith(1);
		expect(result).toEqual(createdCustomer);
	});

	it('should delete a customer successfully', async () => {
		await customerService.delete(1);
		expect(mockCustomerRepository.delete).toHaveBeenCalledWith(1);
	});

	it('should update a customer successfully', async () => {
		await customerService.update(1, updatedCustomerData);
		expect(mockCustomerRepository.update).toHaveBeenCalledWith(
			1,
			updatedCustomerData
		);
	});
});
