export default interface IRent {
	id?: number;
	carId: number;
	customerId: number;
	unitPrice: number;
	startDate: Date;
	endDate: Date;
	totalPrice: number;
	paymentMethod: 'cash' | 'card';
	isPaid: boolean;
}
