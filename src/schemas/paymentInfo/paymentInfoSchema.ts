import * as yup from "yup"

const paymentInfoSchema= {
    Name:yup.string().required(),
    cardNo:yup.string().required(),
    cvvNo:yup.string().required(),
    expireDate:yup.string().required(),
     cpf:yup.string().required() 
}
export{paymentInfoSchema}