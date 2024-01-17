import { CustomerModel, CustomerRepository } from '../../customerModule';
import {
	customerToCreate,
	createdCustomer,
	customerId,
	customerList,
	updatedCustomerData,
} from './fixtures/testDataRepository';
describe('CustomerRepository', () => {
	let mockCustomerModel: any;
	let customerRepository: CustomerRepository;
	beforeEach(() => {
		mockCustomerModel = {
			create: jest.fn(),
			findAll: jest.fn(),
			destroy: jest.fn(),
			findOne: jest.fn(),
			update: jest.fn(),
		} as unknown as CustomerModel;
		customerRepository = new CustomerRepository(mockCustomerModel);
	});
	describe('create', () => {
		it('should create a Customer', async () => {
			mockCustomerModel.create.mockResolvedValueOnce(createdCustomer);
			const result = await customerRepository.create(customerToCreate);
			expect(mockCustomerModel.create).toHaveBeenCalledWith(
				customerToCreate
			);
			expect(result).toEqual(createdCustomer);
		});
	});
	describe('delete', () => {
		it('should delete a customer by ID', async () => {
			mockCustomerModel.destroy.mockResolvedValueOnce(1);
			const result = await customerRepository.delete(customerId);
			expect(mockCustomerModel.destroy).toHaveBeenCalledWith({
				where: { id: customerId },
			});
			expect(result).toEqual(1);
		});
	});
	describe('getByID', () => {
		it('should return a customer by ID', async () => {
			mockCustomerModel.findOne.mockResolvedValueOnce(createdCustomer);
			const result = await customerRepository.getByID(customerId);
			expect(mockCustomerModel.findOne).toHaveBeenCalledWith({
				where: { id: customerId },
			});
			expect(result).toEqual(createdCustomer);
		});
	});
	describe('getAll', () => {
		it('should return all customers', async () => {
			mockCustomerModel.findAll.mockResolvedValueOnce(customerList);
			const result = await customerRepository.getAll();
			expect(mockCustomerModel.findAll).toHaveBeenCalled();
			expect(result).toEqual(customerList);
		});
	});
	describe('update', () => {
		it('should update a customer by ID', async () => {
			mockCustomerModel.update.mockResolvedValueOnce([1]);
			const result = await customerRepository.update(
				customerId,
				updatedCustomerData
			);
			expect(mockCustomerModel.update).toHaveBeenCalledWith(
				updatedCustomerData,
				{
					where: { id: customerId },
				}
			);
			expect(result[0]).toEqual(1);
		});
	});
});
