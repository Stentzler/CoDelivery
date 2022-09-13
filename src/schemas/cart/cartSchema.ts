import * as yup from 'yup';

const addProductSchema = yup.object().shape({
	prodId: yup.string().required(),
});

export {addProductSchema};
