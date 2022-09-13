import { IProductRequest } from '../../interfaces/product/product.interface';
import { IRestaurantCreate } from '../../interfaces/restaurants';
import { IUserRequest } from '../../interfaces/users';

export const mockedUser200: IUserRequest = {
  fullName: 'Joana',
  userName: 'Joana23',
  email: 'joana@kenzie.com',
  password: '123456',
  // address: {
  //   street: 'Rua Barcelos Domingos',
  //   number: '20',
  //   zipCode: '25017-340',
  //   city: 'Rio de Janeiro',
  //   state: 'Rio de Janeiro',
  //   complement: 'Condomínio Gaivotas',
  // },
  // paymentInfo: {
  //   name: 'Joana',
  //   cardNo: '2452374993562234',
  //   cvvNo: '950',
  //   expireDate: '12/31',
  //   cpf: '16203209792',
  // },
};

export const mockedUser201: IUserRequest = {
  fullName: 'Joana',
  userName: 'Joana23',
  email: 'joana2@kenzie.com',
  password: '123456',
  // address: {
  //   street: 'Rua Barcelos Domingos',
  //   number: '20',
  //   zipCode: '25017-340',
  //   city: 'Rio de Janeiro',
  //   state: 'Rio de Janeiro',
  //   complement: 'Condomínio Gaivotas',
  // },
  // paymentInfo: {
  //   name: 'Joana',
  //   cardNo: '2452374993562234',
  //   cvvNo: '950',
  //   expireDate: '12/31',
  //   cpf: '16203209792',
  // },
};

export const mockedUserSecond: IUserRequest = {
  fullName: 'Joana D Arc',
  userName: 'Joana23',
  email: 'user@mail.com',
  password: '1234',
  // address: {
  //   street: 'Rua Barcelos Domingos',
  //   number: '20',
  //   zipCode: '25017-342',
  //   city: 'Rio de Janeiro',
  //   state: 'Rio de Janeiro',
  //   complement: 'Condomínio Gaivotas',
  // },
  // paymentInfo: {
  //   name: 'Joana D`Arc',
  //   cardNo: '2452374889562234',
  //   cvvNo: '951',
  //   expireDate: '11/30',
  //   cpf: '16203209782',
  // },
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
  address: {
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
  address: {
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
  phoneNumber: '6689467123',
  img_url: '',
  category: 'Fast Food',
  address: {
    street: 'Avenida Herculano Teixeira da Rocha',
    number: '47',
    zipCode: '35745-932',
    city: 'Andiroba',
    state: 'MG',
    complement: '',
  },
};

export const mockedRestaurant201: IRestaurantCreate = {
  name: 'KenzieYa',
  description: 'The taste of Japan is closer than you think',
  email: 'kenzieya@email.com',
  password: '123456',
  cnpj: '72.482.202/0001-28',
  phoneNumber: '6689467123',
  img_url: '',
  category: 'Japanese',
  address: {
    street: 'Avenida Doutor Cristiano Guimarães',
    number: '823',
    zipCode: '31720-300',
    city: 'Belo Horizonte',
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
  phoneNumber: '2126420659',
  img_url: '',
  category: 'Fast Food',
  address: {
    street: 'Rua Coelho e Castro',
    number: '125',
    zipCode: '20081-060',
    city: 'Rio de Janeiro',
    state: 'RJ',
    complement: '',
  },
};

export const mockedRestaurantLogin = {
  email: 'kenzie@email.com',
  password: '123456',
};

export const mockedSecondRestaurantLogin = {
  email: 'kenzieya@email.com',
  password: '123456',
};

export const mockedRestaurantLoginNoEmail = {
  password: '123456',
};

export const mockedRestaurantLoginNoPassword = {
  email: 'kenzie@email.com',
};

export const mockedRestaurantLoginWrongPassword = {
  email: 'kenzie@email.com',
  password: '123457',
};

export const restaurantEditData1 = {
  name: 'KenzieHappyBurgers',
};

export const restaurantEditData2 = {
  address: {
    street: 'Rua Cortes',
    number: '928',
    zipCode: '22725-430',
    complement: '',
  },
};

export const dupeRestaurantEditData1 = {
  name: 'KenzieYa',
};

export const dupeRestaurantEditData2 = {
  email: 'kenzieya@email.com',
};

export const dupeRestaurantEditData3 = {
  cnpj: '72.482.202/0001-28',
};

export const dummyRestaurantEditData = {
  name: 'RandomRestaurantName9999',
};

export const sensibleRestaurantData = [
  { createdAt: '2021-05-23T12:32:44.727Z' },
  { updatedAt: '2021-09-24T08:17:56.139Z' },
  { id: '68a6fe9e-1c4b-4e8f-a09a-d8faac39e0e7' },
  { isRestaurant: false },
  { isActive: false },
];

export const sensibleRestaurantAddressData = {
  address: {
    id: '81b0d854-fd5a-4a92-8e3d-cf9cf646d901',
  },
};

export const wrongData = {
  crabRave: 'trolling data',
};

export const mockedProduct: IProductRequest = {
  name: 'X-Tudo',
  description: 'Com tudo, e um pouco mais!',
  price: 25,
  category: 'Hamburgers',
};

export const mockedProduct2: IProductRequest = {
  name: 'X-Tudão',
  description: 'Vale por dois tudos!',
  price: 40,
  category: 'Hamburgers',
};

export const mockedProduct3: IProductRequest = {
  name: 'Coke',
  description: 'Refresca até a alma!',
  price: 6,
  category: 'Drinks',
};

export const mockedProduct4: IProductRequest = {
  name: 'Temaki',
  description: "'Fishy' roll",
  price: 13,
  category: 'Sushis',
};

export const mockedMissingProduct = {
  name: 'Missing',
  price: 30,
  category: 'Drinks',
};

export const unexistentCategoryProduct = {
  name: 'Product',
  description: 'Yes sir this boutta fail',
  price: 42,
  category: 'Crabrave',
};

export const productEditData = {
  name: 'X-Kenzie',
  description: "Kenzie's Special!",
};

export const fakeProductId = '01e2a76d-8b44-48f6-8760-c95c7ed6bbd4';
