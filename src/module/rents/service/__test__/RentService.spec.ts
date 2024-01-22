import { RentRepository, RentService } from '../../RentModule';
import {
	RentData,
	CreatedRent,
	RentsArray,
	rentId,
	RentDataToUpdate,
} from './fixtures/TestRentService';

describe('Rents Service', () => {
	const mockRentRepository = {
		getById: jest.fn(),
		create: jest.fn(),
		getAll: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	} as unknown as RentRepository;

	const rentService = new RentService(mockRentRepository);

	it('should call a rentRepository.create successfully', async () => {
		(mockRentRepository.create as jest.Mock).mockResolvedValueOnce(
			CreatedRent
		);
		const result = await rentService.create(RentData);
		expect(mockRentRepository.create).toHaveBeenCalledWith(RentData);
		expect(result).toEqual(CreatedRent);
	});

	it('should get all rents successfully', async () => {
		(mockRentRepository.getAll as jest.Mock).mockResolvedValueOnce(
			RentsArray
		);
		const result = await rentService.getAll();
		expect(mockRentRepository.getAll).toHaveBeenCalled();
		expect(result).toEqual(RentsArray);
	});

	it('should delete a rent successfully', async () => {
		await rentService.delete(rentId);
		expect(mockRentRepository.delete).toHaveBeenCalledWith(rentId);
	});

	it('should update a rent successfully', async () => {
		await rentService.update(rentId, RentDataToUpdate);
		expect(mockRentRepository.update).toHaveBeenCalledWith(
			rentId,
			RentDataToUpdate
		);
	});

	it('should get a rent by ID successfully', async () => {
		(mockRentRepository.getById as jest.Mock).mockResolvedValueOnce(
			RentData
		);
		const result = await rentService.getById(rentId);
		expect(mockRentRepository.getById).toHaveBeenCalledWith(rentId);
		expect(result).toEqual(RentData);
	});
});
