export default class CarsRepository {
    constructor(carModel) {
        this.carModel = carModel;
    }
    async create(car) {
        return this.carModel.create(car);
    }
    async getAll() {
        return this.carModel.findAll();
    }
    async delete(carId) {
        return this.carModel.destroy({
            where: {
                id: carId,
            },
        });
    }
    async getByID(carId) {
        return this.carModel.findOne({
            where: {
                id: carId,
            },
        });
    }
    async update(carId, updatedCarData) {
        return await this.carModel.update(updatedCarData, {
            where: {
                id: carId,
            },
        });
    }
}
//# sourceMappingURL=carsRepository.js.map