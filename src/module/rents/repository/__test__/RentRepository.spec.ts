import { RentModel, RentRepository } from '../../RentModule';
import {
	RentId,
	CreateRentData,
	CreatedRent,
	RentsArray,
	ModifiedRentData,
} from './fixtures/TetsRentsRepository';

describe('RentsRepository', () => {
	const mockCarModel: any = {};
	const mockCustomerModel: any = {};
	const mockRentModel: any = {
		create: jest.fn(),
		findAll: jest.fn(),
		destroy: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
	} as unknown as RentModel;
	const rentsRepository = new RentRepository(
		mockRentModel,
		mockCarModel,
		mockCustomerModel
	);

	it('should create a rent', async () => {
		mockRentModel.create.mockResolvedValueOnce(CreatedRent);
		const result = await rentsRepository.create(CreateRentData);
		expect(mockRentModel.create).toHaveBeenCalledWith(CreateRentData);
		expect(result).toEqual(CreatedRent);
	});

	it('should get all rents', async () => {
		mockRentModel.findAll.mockResolvedValueOnce(RentsArray);
		const result = await rentsRepository.getAll();
		expect(mockRentModel.findAll).toHaveBeenCalled();
		expect(result).toEqual(RentsArray);
	});

	it('should destroy a rent', async () => {
		const destroyedRows = 1;
		mockRentModel.destroy.mockResolvedValueOnce(destroyedRows);
		const result = await rentsRepository.delete(RentId);
		expect(mockRentModel.destroy).toHaveBeenCalledWith({
			where: {
				id: RentId,
			},
		});
		expect(result).toEqual(destroyedRows);
	});

	it('should get a rent by ID', async () => {
		mockRentModel.findOne.mockResolvedValueOnce(CreatedRent);
		const result = await rentsRepository.getById(RentId);
		expect(mockRentModel.findOne).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					id: RentId,
				},
			})
		);
		expect(result).toEqual(CreatedRent);
	});

	it('should update a rent by ID', async () => {
		const updatedRows = 1;
		mockRentModel.update.mockResolvedValueOnce(updatedRows);
		const result = await rentsRepository.update(RentId, ModifiedRentData);
		expect(mockRentModel.update).toHaveBeenCalledWith(ModifiedRentData, {
			where: {
				id: RentId,
			},
		});
		expect(result).toEqual(updatedRows);
		const updateOptions = mockRentModel.update.mock.calls[0][1];
		expect(updateOptions.where).toHaveProperty('id', RentId);
	});
});
