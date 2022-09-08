import * as yup from "yup"
import { addressesSchema } from "../addresses/addressesSchema"
import { paymentInfoSchema } from "../paymentInfo/paymentInfoSchema"

const userSchema= yup.object().shape({
    fullName:yup.string().required(),
    userName:yup.string().required(),
    email:yup.string().required().email(),
    password:yup.string().required(),
    addressInfo:yup.object(addressesSchema),
    paymentInfo:yup.object(paymentInfoSchema),
})

export {userSchema}