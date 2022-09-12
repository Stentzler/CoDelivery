export interface IAddressInfoRequest {
	street: string;
	number: string;
	zipCode: string;
	city: string;
	state: string;
	complement?: string;
}

export interface IAddressUpdateRequest {
	street?: string;
	number?: string;
	zipCode?: string;
	city?: string;
	state?: string;
	complement?: string;
}
