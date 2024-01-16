import { CarsRepository, CarService } from '../module';
import iCar from '../entity/iCar';
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
	////////TEST PARA EL SERVICE CREATE
	describe('create', () => {
		it('should create a car successfully', async () => {
			const carData: iCar = {
				model: 'TestModel',
				transmission: 'Automatic',
				passengers: 4,
				air_conditioning: true,
				color: 'Red',
				kms: 50000,
				year: 2022,
				brand: 'TestBrand',
			};
			const createdCar: iCar = {
				id: 1,
				model: 'TestModel',
				transmission: 'Automatic',
				passengers: 4,
				air_conditioning: true,
				color: 'Red',
				kms: 50000,
				year: 2022,
				brand: 'TestBrand',
			};
			(mockCarRepository.create as jest.Mock).mockResolvedValueOnce(
				createdCar
			);
			const result = await carService.create(carData);
			expect(mockCarRepository.create).toHaveBeenCalledWith(carData);
			expect(result).toEqual(createdCar);
		});
	});
	////////TEST PARA EL SERVICE GET ALL
	describe('getAll', () => {
		it('should get all cars successfully', async () => {
			const mockCarList: iCar[] = [
				{
					id: 1,
					model: 'Spider',
					transmission: 'Automatic',
					passengers: 4,
					air_conditioning: true,
					color: 'Red',
					kms: 50000,
					year: 2022,
					brand: 'Ferrari',
				},
				{
					id: 2,
					model: 'Gol',
					transmission: 'Manual',
					passengers: 5,
					air_conditioning: false,
					color: 'Blue',
					kms: 60000,
					year: 2023,
					brand: 'VW',
				},
				{
					id: 3,
					model: 'A1',
					transmission: 'Manual',
					passengers: 5,
					air_conditioning: true,
					color: 'Blue',
					kms: 0,
					year: 2024,
					brand: 'Audi',
				},
			];
			(mockCarRepository.getAll as jest.Mock).mockResolvedValueOnce(
				mockCarList
			);
			const result = await carService.getAll();
			expect(mockCarRepository.getAll).toHaveBeenCalled();
			expect(result).toEqual(mockCarList);
		});
	});
	////////TEST PARA EL SERVICE DELETE
	describe('delete', () => {
		it('should delete a car successfully', async () => {
			const carIdToDelete = 1;
			await carService.delete(carIdToDelete);
			expect(mockCarRepository.delete).toHaveBeenCalledWith(
				carIdToDelete
			);
		});
	});
	////////TEST PARA EL SERVICE UPDATE
	describe('update', () => {
		it('should update a car successfully', async () => {
			const carIdToUpdate = 1;
			const updatedCarData: iCar = {
				model: 'UpdatedModel',
				transmission: 'Automatic',
				passengers: 4,
				air_conditioning: true,
				color: 'Blue',
				kms: 60000,
				year: 2023,
				brand: 'UpdatedBrand',
			};
			await carService.update(carIdToUpdate, updatedCarData);
			expect(mockCarRepository.update).toHaveBeenCalledWith(
				carIdToUpdate,
				updatedCarData
			);
		});
	});
	////////TEST PARA EL SERVICE GET BY ID
	describe('getById', () => {
		it('should get a car by ID successfully', async () => {
			const carIdToGet = 1;
			const mockCar: iCar = {
				id: carIdToGet,
				model: 'GolTrend',
				transmission: 'Manual',
				passengers: 5,
				air_conditioning: true,
				color: 'White',
				kms: 140000,
				year: 2014,
				brand: 'VW',
			};
			(mockCarRepository.getByID as jest.Mock).mockResolvedValueOnce(
				mockCar
			);
			const result = await carService.getById(carIdToGet);
			expect(mockCarRepository.getByID).toHaveBeenCalledWith(carIdToGet);
			expect(result).toEqual(mockCar);
		});
	});
});
