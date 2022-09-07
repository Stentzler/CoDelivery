import { IUserRequest } from "../../interfaces/users";

export const mockedUser200: IUserRequest = {
  full_name: "Joana",
  username: "Joana23",
  email: "joana@kenzie.com",
  password: "123456",
  isRestaurant: false,
  address_info: {
    address: "Rua Barcelos Domingos",
    number: "20",
    zipCode: "25017-340",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    complement: "Condomínio Gaivotas",
  },
  payment_info: {
    name: "Joana",
    cardNo: "2452374993562234",
    cvvNo: "950",
    expireDate: "12/31",
    cpf: "16203209792",
  },
};
