import * as yup from "yup"

const addressesSchema= yup.object().shape({
    street:yup.string().required(),
    number:yup.string().required(),
    zipCode:yup.string().required(),
    city:yup.string().required(),
    state:yup.string().required(),
    complement:yup.string(),
})

export{addressesSchema}