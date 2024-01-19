import {
	Model,
	DataType,
	Table,
	Column,
	ForeignKey,
	BelongsTo,
	Sequelize,
	HasMany,
} from 'sequelize-typescript';
import { CarsModel } from '../../cars/CarsModule';
import { CustomerModel } from '../../customers/CustomerModule';

@Table({ modelName: 'Rents' })
export default class RentModel extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id!: number;

	@Column({ type: DataType.FLOAT, allowNull: false })
	unitPrice!: number;

	@Column({ type: DataType.DATE, allowNull: false })
	startDate!: Date;

	@Column({ type: DataType.DATE, allowNull: false })
	endDate!: Date;

	@Column({ type: DataType.FLOAT, allowNull: false })
	totalPrice!: number;

	@Column({ type: DataType.ENUM('cash', 'card'), allowNull: false })
	paymentMethod!: 'cash' | 'card';

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	isPaid!: boolean;

	@BelongsTo(() => CarsModel, 'carId')
	car!: CarsModel;

	@BelongsTo(() => CustomerModel, 'customerId')
	customer!: CustomerModel;
}
