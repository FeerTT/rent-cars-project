import ICustomer from '../../../entity/ICustomers';

export const createCustomerFixture = {
	body: {
		firstName: 'Fernando',
		lastName: 'Trillo',
		documentType: 'DNI',
		documentNumber: 123456789,
		nationality: 'Argentinian',
		address: '123 Main St',
		phone: 1234567890,
		email: 'fernandot@example.com',
		birthDate: '2000-01-01',
	},
};
export const customerData: ICustomer = {
	firstName: 'Fernando',
	lastName: 'Trillo',
	documentType: 'DNI',
	documentNumber: 123456789,
	nationality: 'Argentinian',
	address: '123 Main St',
	phone: 1234567890,
	email: 'fernandot@example.com',
	birthDate: '2000-01-01',
};

export const viewCustomerFixture = {
	params: {
		id: 1,
	},
};

export const updateCustomerFixture = {
	params: {
		id: 1,
	},
	body: {
		firstName: 'Franco',
		lastName: 'Gomez',
		documentType: 'DNI',
		documentNumber: 1234222,
		nationality: 'Chileno',
		address: 'Paraná Av 25',
		phone: 1234567890,
		email: 'francog@example.com',
		birthDate: '1999-01-01',
	},
};

export const customerID = 1;
