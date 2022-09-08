import { IRestaurantCreate } from '../../interfaces/restaurants';
import { IUserRequest } from '../../interfaces/users';

export const mockedUser200: IUserRequest = {
  fullName: 'Joana',
  userName: 'Joana23',
  email: 'joana@kenzie.com',
  password: '123456',
  addressInfo: {
    address: 'Rua Barcelos Domingos',
    number: '20',
    zipCode: '25017-340',
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    complement: 'Condomínio Gaivotas',
  },
  paymentInfo: {
    name: 'Joana',
    cardNo: '2452374993562234',
    cvvNo: '950',
    expireDate: '12/31',
    cpf: '16203209792',
  },
};

export const mockedUser201: IUserRequest = {
  fullName: 'Joana',
  userName: 'Joana23',
  email: 'joana2@kenzie.com',
  password: '123456',
  addressInfo: {
    address: 'Rua Barcelos Domingos',
    number: '20',
    zipCode: '25017-340',
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    complement: 'Condomínio Gaivotas',
  },
  paymentInfo: {
    name: 'Joana',
    cardNo: '2452374993562234',
    cvvNo: '950',
    expireDate: '12/31',
    cpf: '16203209792',
  },
};

export const mockedUserSecond: IUserRequest = {
  fullName: 'Joana D Arc',
  userName: 'Joana23',
  email: 'user@mail.com',
  password: '1234',
  addressInfo: {
    address: 'Rua Barcelos Domingos',
    number: '20',
    zipCode: '25017-342',
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    complement: 'Condomínio Gaivotas',
  },
  paymentInfo: {
    name: 'Joana D`Arc',
    cardNo: '2452374889562234',
    cvvNo: '951',
    expireDate: '11/30',
    cpf: '16203209782',
  },
};

export const mockedUserLogin = {
  email: 'joana@kenzie.com',
  password: '123456',
};

export const mockedUser201Login = {
  email: 'joana2@kenzie.com',
  password: '123456',
};

export const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyYzQxODhlLTZlMGEtNGFiNi1hZWFjLTQyNDZjNDVkOWMyOCIsImlzUmVzdGF1cmFudCI6ZmFsc2UsImlhdCI6MTY2MjU3MzIzMiwiZXhwIjoxNjYyNjU5NjMyfQ.Q_a9iKQ0QCM6UhMekUYjOAzi647qGEqgylxLaMNlVns';

export const editData1 = {
  userName: 'Joaninha',
};

export const editData2 = {
  addressInfo: {
    number: '42',
  },
};

export const editData3 = {
  paymentInfo: {
    cardNo: '2452374889568989',
  },
};

export const sensibleDataUser = [
  { id: 'd3c72f8e-6bd4-2ad5-a92c-2b87c45d9bd9' },
  { createdAt: '2019-02-05T23:31:22.529Z' },
  { updatedAt: '2020-12-09T07:48:09.358Z' },
  { isRestaurant: true },
];

export const sensibleDataAddressInfo = {
  addressInfo: {
    id: 'd3c72f8e-6bd4-2ad5-a92c-2b87c45d9bd9',
  },
};

export const sensibleDataPaymentInfo = {
  paymentInfo: {
    id: 'd3c72f8e-6bd4-2ad5-a92c-2b87c45d9bd9',
  },
};

export const sensibleDataCartInfo = {
  cart: {
    price: '3.00',
  },
};

export const loginNoEmail = {
  password: '123456',
};

export const loginNoPassword = {
  email: 'joana@kenzie.com',
};

export const loginWrongPassword = {
  email: 'joana@kenzie.com',
  password: '654321',
};

export const mockedRestaurant200: IRestaurantCreate = {
  name: 'KenzieBurger',
  description: 'Best burgers of all time!',
  email: 'kenzie@email.com',
  password: '123456',
  cnpj: '86.903.685/0001-95',
  img_url: '',
  category: 'Fast Food',
  restaurantAddress: {
    address: 'Avenida Herculano Teixeira da Rocha',
    number: '47',
    phoneNumber: '6689467123',
    zipCode: '35745-932',
    city: 'Andiroba',
    state: 'MG',
    complement: '',
  },
};

export const mockedRestaurantDummy: IRestaurantCreate = {
  name: 'FamilyBurger',
  description: 'Burgers for your entire family!',
  email: 'family@email.com',
  password: '123456',
  cnpj: '93.716.438/0025-92',
  img_url: '',
  category: 'Fast Food',
  restaurantAddress: {
    address: 'Rua Coelho e Castro',
    number: '125',
    phoneNumber: '2126420659',
    zipCode: '20081-060',
    city: 'Rio de Janeiro',
    state: 'RJ',
    complement: '',
  },
};
