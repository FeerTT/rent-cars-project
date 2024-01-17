import ICar from '../entity/Icars';
import { CarsRepository } from '../CarsModule';

export default class CarsService {
	public carRepository: CarsRepository;

	constructor(carRepository: CarsRepository) {
		this.carRepository = carRepository;
	}
	public async create(car: ICar): Promise<ICar> {
		return await this.carRepository.create(car);
	}

	public async getAll(): Promise<ICar[]> {
		return await this.carRepository.getAll();
	}

	public async delete(carId: number): Promise<void> {
		await this.carRepository.delete(carId);
	}

	public async update(carId: number, updatedCarData: ICar): Promise<void> {
		await this.carRepository.update(carId, updatedCarData);
	}

	public async getById(carId: number): Promise<any> {
		const car = await this.carRepository.getByID(carId);
		return car;
	}
}
