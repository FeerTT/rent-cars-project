export default class CarService {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async create(car) {
        return await this.carRepository.create(car);
    }
    async getAll() {
        return await this.carRepository.getAll();
    }
    async delete(carId) {
        await this.carRepository.delete(carId);
    }
    async update(carId, updatedCarData) {
        await this.carRepository.update(carId, updatedCarData);
    }
    async getById(carId) {
        const car = await this.carRepository.getByID(carId);
        return car;
    }
}
//# sourceMappingURL=carsService.js.map