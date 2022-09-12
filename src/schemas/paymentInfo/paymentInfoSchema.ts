import * as yup from "yup"

const paymentInfoSchema= yup.object().shape({
    name:yup.string().required(),
    cardNo:yup.string().required(),
    cvvNo:yup.string().required(),
    expireDate:yup.string().required(),
     cpf:yup.string().required() 
})
export{paymentInfoSchema}