import ICustomer from '../../../entity/ICustomers';

export const createdCustomer: ICustomer = {
	id: 1,
	firstName: 'Fernando',
	lastName: 'Trillo',
	documentType: 'DNI',
	documentNumber: 123456789,
	nationality: 'Argentinian',
	address: 'A.B 125',
	phone: 343434123,
	email: 'fernando.trillo@example.com',
	birthDate: '2000-01-01',
};

export const customer: ICustomer = {
	firstName: 'Fernando',
	lastName: 'Trillo',
	documentType: 'DNI',
	documentNumber: 123456789,
	nationality: 'Argentinian',
	address: 'A.B 125',
	phone: 343434123,
	email: 'fernando.trillo@example.com',
	birthDate: '2000-01-01',
};

export const customerList: ICustomer[] = [
	{
		id: 1,
		firstName: 'Fernando',
		lastName: 'Trillo',
		documentType: 'DNI',
		documentNumber: 123456789,
		nationality: 'Argentinian',
		address: 'A.B 125',
		phone: 343434123,
		email: 'fernando.trillo@example.com',
		birthDate: '2000-01-01',
	},
	{
		id: 2,
		firstName: 'Ana',
		lastName: 'Gomez',
		documentType: 'Passport',
		documentNumber: 987654321,
		nationality: 'Spanish',
		address: 'XYZ Street',
		phone: 555555555,
		email: 'ana.gomez@example.com',
		birthDate: '1995-05-15',
	},
	{
		id: 3,
		firstName: 'John',
		lastName: 'Doe',
		documentType: 'ID',
		documentNumber: 555555555,
		nationality: 'American',
		address: '123 Main St',
		phone: 777777777,
		email: 'john.doe@example.com',
		birthDate: '1980-08-20',
	},
];

export const updatedCustomerData: ICustomer = {
	firstName: 'UpdatedFirstName',
	lastName: 'UpdatedLastName',
	documentType: 'Passport',
	documentNumber: 987654321,
	nationality: 'UpdatedNationality',
	address: 'UpdatedAddress',
	phone: 555555555,
	email: 'updated.email@example.com',
	birthDate: '1990-05-15',
};
