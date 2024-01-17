import { CarsRepository, CarService } from '../../module';
import { carData, createdCar } from './fixtures/testCreateData';
import { carList } from './fixtures/testGetAllData';
import { carId } from './fixtures/testUpdateData';

describe('CarsController', () => {
	let mockCarRepository: CarsRepository;
	let carService: CarService;
	beforeEach(() => {
		mockCarRepository = {
			getByID: jest.fn(),
			create: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		} as unknown as CarsRepository;
		carService = new CarService(mockCarRepository);
	});

	describe('create', () => {
		it('should create a car successfully', async () => {
			(mockCarRepository.create as jest.Mock).mockResolvedValueOnce(
				createdCar
			);
			const result = await carService.create(carData);
			expect(mockCarRepository.create).toHaveBeenCalledWith(carData);
			expect(result).toEqual(createdCar);
		});
	});

	describe('getAll', () => {
		it('should get all cars successfully', async () => {
			(mockCarRepository.getAll as jest.Mock).mockResolvedValueOnce(
				carList
			);
			const result = await carService.getAll();
			expect(mockCarRepository.getAll).toHaveBeenCalled();
			expect(result).toEqual(carList);
		});
	});

	describe('delete', () => {
		it('should delete a car successfully', async () => {
			const carIdToDelete = 1;
			await carService.delete(carIdToDelete);
			expect(mockCarRepository.delete).toHaveBeenCalledWith(
				carIdToDelete
			);
		});
	});

	describe('update', () => {
		it('should update a car successfully', async () => {
			await carService.update(carId, carData);
			expect(mockCarRepository.update).toHaveBeenCalledWith(
				carId,
				carData
			);
		});
	});

	describe('getById', () => {
		it('should get a car by ID successfully', async () => {
			(mockCarRepository.getByID as jest.Mock).mockResolvedValueOnce(
				carData
			);
			const result = await carService.getById(carId);
			expect(mockCarRepository.getByID).toHaveBeenCalledWith(carId);
			expect(result).toEqual(carData);
		});
	});
});
