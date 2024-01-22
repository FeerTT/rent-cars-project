import { RentRepository } from '../RentModule';
import IRent from '../entity/IRent';

export default class RentService {
	private rentsRepository: RentRepository;
	constructor(rentsRepository: RentRepository) {
		this.rentsRepository = rentsRepository;
	}

	public async create(rent: IRent): Promise<IRent> {
		return await this.rentsRepository.create(rent);
	}
	public async getAll(): Promise<IRent[]> {
		return await this.rentsRepository.getAll();
	}
	public async getById(rentId: number): Promise<any> {
		const rent = await this.rentsRepository.getById(rentId);
		return rent;
	}
	public async update(rentId: number, updatedRentData: IRent): Promise<void> {
		await this.rentsRepository.update(rentId, updatedRentData);
	}
	public async delete(rentId: number): Promise<void> {
		await this.rentsRepository.delete(rentId);
	}
}
