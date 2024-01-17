import { Model, DataType, Table, Column } from 'sequelize-typescript';

@Table({ modelName: 'Customers' })
export default class CustomerModel extends Model {
	@Column({ type: DataType.STRING, allowNull: false })
	firstName!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	lastName!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	documentType!: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	documentNumber!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	nationality!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	address!: string;

	@Column({ type: DataType.NUMBER, allowNull: false })
	phone!: number;

	@Column({ type: DataType.STRING, allowNull: false })
	email!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	birthDate!: string;
}
