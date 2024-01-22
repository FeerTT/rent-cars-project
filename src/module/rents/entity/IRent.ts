export default interface IRent {
	id?: number;
	unitPrice: number;
	startDate: Date;
	endDate: Date;
	totalPrice: number;
	paymentMethod: 'cash' | 'card';
	isPaid: boolean;
	carId?: number;
	customerId?: number;
}
