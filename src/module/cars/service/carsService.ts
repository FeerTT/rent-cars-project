import iCar from '../entity/iCar';
import { CarsRepository } from '../module';

export default class CarService {
	public carRepository: CarsRepository;

	constructor(carRepository: CarsRepository) {
		this.carRepository = carRepository;
	}
	public async create(car: iCar): Promise<iCar> {
		return await this.carRepository.create(car);
	}

	public async getAll(): Promise<iCar[]> {
		return await this.carRepository.getAll();
	}

	public async delete(carId: number): Promise<void> {
		await this.carRepository.delete(carId);
	}

	public async update(carId: number, updatedCarData: iCar): Promise<void> {
		await this.carRepository.update(carId, updatedCarData);
	}

	public async getById(carId: number): Promise<any> {
		const car = await this.carRepository.getByID(carId);
		return car;
	}
}
