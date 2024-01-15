export default interface iResponse {
	status: boolean;
	errors: string | Array<string>;
	data: any;
}
