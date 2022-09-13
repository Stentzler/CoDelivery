import * as yup from 'yup';

const addressesSchema = yup.object().shape({
	street: yup.string().required(),
	number: yup.string().required(),
	zipCode: yup.string().required(),
	city: yup.string().required(),
	state: yup.string().required(),
	complement: yup.string(),
});

const updateUseraddressesSchema = yup.object().shape({
	street: yup.string(),
	number: yup.string(),
	zipCode: yup.string(),
	city: yup.string(),
	state: yup.string(),
	complement: yup.string(),
});

export {addressesSchema, updateUseraddressesSchema};
