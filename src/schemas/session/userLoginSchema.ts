import * as yup from "yup"

const userLoginSchema= yup.object().shape({
   

    email:yup.string().required().email(),
    password:yup.string().required(),
  
})

export {userLoginSchema}
