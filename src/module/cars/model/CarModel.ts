import {
	Sequelize,
	Model,
	DataType,
	Table,
	Column,
} from 'sequelize-typescript';

@Table({ modelName: 'Cars' })
export default class CarModel extends Model {
	@Column({ type: DataType.STRING, allowNull: false })
	brand: string;

	@Column({ type: DataType.STRING, allowNull: false })
	model: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	year: number;

	@Column({ type: DataType.INTEGER, allowNull: false })
	kms: number;

	@Column({ type: DataType.STRING, allowNull: false })
	color: string;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	air_conditioning: boolean;

	@Column({ type: DataType.INTEGER, allowNull: false })
	passengers: number;

	@Column({ type: DataType.STRING, allowNull: false })
	transmission: string;
}
