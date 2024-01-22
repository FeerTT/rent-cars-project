export const createRentFixture = {
	body: {
		carId: 16,
		customerId: 1,
		unitPrice: 100.0,
		startDate: '2024-01-18T08:00:00Z',
		endDate: '2024-01-25T18:00:00Z',
		totalPrice: 1000.0,
		paymentMethod: 'card',
		isPaid: false,
	},
};
export const rentID = 1;
export const updateRentFixture = {
	params: {
		id: 1,
	},
	body: {
		carId: 16,
		customerId: 1,
		unitPrice: 100.0,
		startDate: '2024-01-18T08:00:00Z',
		endDate: '2024-01-25T18:00:00Z',
		totalPrice: 1000.0,
		paymentMethod: 'cash',
		isPaid: true,
	},
};
