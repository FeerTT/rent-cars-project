import {
	Model,
	DataType,
	Table,
	Column,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { CarsModel } from '../../cars/CarsModule';
import { CustomerModel } from '../../customers/CustomerModule';

@Table({ modelName: 'Rents' })
export default class RentModel extends Model {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id!: number;

	@ForeignKey(() => CarsModel)
	@Column({ type: DataType.INTEGER, allowNull: false })
	carId!: number;

	@ForeignKey(() => CustomerModel)
	@Column({ type: DataType.INTEGER, allowNull: true })
	customerId!: number;

	@BelongsTo(() => CarsModel)
	car!: CarsModel;

	@BelongsTo(() => CustomerModel)
	customer!: CustomerModel;

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
}
