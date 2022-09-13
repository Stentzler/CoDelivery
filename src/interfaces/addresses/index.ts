export interface IAddressInfoRequest {
	street: string;
	number: string;
	zipCode: string;
	city: string;
	state: string;
	complement?: string;
}

export interface IUserAddressUpdateRequest {
	id?: string;
	street?: string;
	number?: string;
	zipCode?: string;
	city?: string;
	state?: string;
	complement?: string;
}
