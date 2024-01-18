import IRent from '../../../entity/IRent';

export const CreateRentData: IRent = {
	carId: 16,
	customerId: 1,
	unitPrice: 100.0,
	startDate: new Date('2024-01-18'),
	endDate: new Date('2024-01-25'),
	totalPrice: 1000.0,
	paymentMethod: 'card',
	isPaid: false,
};
export const ModifiedRentData: IRent = {
	carId: 16,
	customerId: 1,
	unitPrice: 100.0,
	startDate: new Date('2024-01-18'),
	endDate: new Date('2024-01-25'),
	totalPrice: 1000.0,
	paymentMethod: 'cash',
	isPaid: true,
};

export const CreatedRent: IRent = {
	id: 1,
	...CreateRentData,
};

export const RentId = 1;

export const RentsArray: IRent[] = [
	{
		carId: 1,
		customerId: 2,
		unitPrice: 100.0,
		startDate: new Date('2024-01-18T08:00:00Z'),
		endDate: new Date('2024-01-25T18:00:00Z'),
		totalPrice: 700.0,
		paymentMethod: 'cash',
		isPaid: true,
	},
	{
		carId: 3,
		customerId: 4,
		unitPrice: 120.0,
		startDate: new Date('2024-02-01T10:00:00Z'),
		endDate: new Date('2024-02-10T20:00:00Z'),
		totalPrice: 1200.0,
		paymentMethod: 'card',
		isPaid: false,
	},
	{
		carId: 5,
		customerId: 5,
		unitPrice: 80.0,
		startDate: new Date('2024-03-05T12:00:00Z'),
		endDate: new Date('2024-03-12T22:00:00Z'),
		totalPrice: 560.0,
		paymentMethod: 'card',
		isPaid: true,
	},
];
