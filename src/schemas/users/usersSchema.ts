import * as yup from "yup"
import { addressesSchema } from "../addresses/addressesSchema"
import { paymentInfoSchema } from "../paymentInfo/paymentInfoSchema"

const userSchema= yup.object().shape({
    full_name:yup.string().required(),
    username:yup.string().required(),
    email:yup.string().required().email(),
    password:yup.string().required(),
    address_info:yup.object(addressesSchema),
    payment_info:yup.object(paymentInfoSchema),
})

export {userSchema}