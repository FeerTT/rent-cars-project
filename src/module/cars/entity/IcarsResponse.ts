export default interface IResponse {
	status: boolean;
	errors: string | Array<string>;
	data: any;
}
