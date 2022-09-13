import * as yup from 'yup';


const userSchema = yup.object().shape({
  fullName: yup.string().required(),
  userName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),

});

export { userSchema };
