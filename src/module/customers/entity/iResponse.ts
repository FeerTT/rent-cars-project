export default interface iResponse {
	status: boolean;
	errors: string | Array<string>;
	data: any;
}

//interface apunte a como debe ir la data, definirle el valor
//iCustomerResponse.ts
//con I mayúscula en la interface y el nombre de archivo
