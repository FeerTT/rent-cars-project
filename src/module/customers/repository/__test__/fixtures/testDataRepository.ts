import ICustomer from '../../../entity/Icustomers';

export const customerToCreate: ICustomer = {
	firstName: 'Jane',
	lastName: 'Doe',
	documentType: 'Passport',
	documentNumber: 987654321,
	nationality: 'Canadian',
	address: '456 Side St',
	phone: 777777777,
	email: 'jane.doe@example.com',
	birthDate: '1995-05-15',
};

export const createdCustomer: ICustomer = {
	id: 1,
	firstName: 'John',
	lastName: 'Doe',
	documentType: 'ID',
	documentNumber: 123456789,
	nationality: 'American',
	address: '123 Main St',
	phone: 555555555,
	email: 'john.doe@example.com',
	birthDate: '1990-01-01',
};

export const customerId = 1;

export const customerList: ICustomer[] = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		documentType: 'ID',
		documentNumber: 123456789,
		nationality: 'American',
		address: '123 Main St',
		phone: 555555555,
		email: 'john.doe@example.com',
		birthDate: '1990-01-01',
	},
	{
		id: 2,
		firstName: 'Alice',
		lastName: 'Smith',
		documentType: 'Passport',
		documentNumber: 987654321,
		nationality: 'British',
		address: '456 Oak St',
		phone: 999888777,
		email: 'alice.smith@example.com',
		birthDate: '1985-05-15',
	},
	{
		id: 3,
		firstName: 'Carlos',
		lastName: 'Gomez',
		documentType: 'Driver License',
		documentNumber: 456789012,
		nationality: 'Mexican',
		address: '789 Pine St',
		phone: 333222111,
		email: 'carlos.gomez@example.com',
		birthDate: '1993-09-30',
	},
];

export const updatedCustomerData = {
	firstName: 'Carlos',
	lastName: 'Spretz',
	documentType: 'DNI',
	documentNumber: 987654321,
	nationality: 'Argentinian',
	address: '323 ST',
	phone: 111222333,
	email: 'updated.email@example.com',
	birthDate: '1995-05-20',
};
