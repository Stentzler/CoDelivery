import * as yup from "yup"

const sessionLoginSchema= yup.object().shape({
   

    email:yup.string().required().email(),
    password:yup.string().required(),
  
})

export {sessionLoginSchema}
