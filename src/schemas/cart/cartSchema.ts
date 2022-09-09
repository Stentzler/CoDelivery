import * as yup from 'yup';

const addProductSchema = yup.object().shape({
	id: yup.string().required(),
});

export {addProductSchema};
