# API Endpoints

**BASE_URL: https://codelivery-api.herokuapp.com**

- [1.0 - User Routes](https://github.com/Stentzler/CoDelivery#1---user_routes)
- &nbsp;&nbsp;&nbsp;&nbsp; [1.1 - User Address Routes](https://github.com/Stentzler/CoDelivery#2---user_address_routes)
- &nbsp;&nbsp;&nbsp;&nbsp; [1.2 - User Paymento_Info Routes](https://github.com/Stentzler/CoDelivery#3---user_payment_info_routes)
- [2 - Restaurant Routes](https://github.com/Stentzler/CoDelivery#4---restaurant-routes)
- [3 - Session Routes](https://github.com/Stentzler/CoDelivery#5---session-routes)
- [4 - Product Routes](https://github.com/Stentzler/CoDelivery#6---product-routes)
- [5 - Cart Routes](https://github.com/Stentzler/CoDelivery#7---cart-routes)
- [6 - Restaurant Categories Routes](https://github.com/Stentzler/CoDelivery#8---restaurant-categories-routes)
- [7 - Product Categories Routes](https://github.com/Stentzler/CoDelivery#9---product-categories-routes)

## 1.0 - User Routes (Pronto)

### 1.0.1 - Create User

- POST /users
- Expected body request example:

```json
{
	"full_name": "John Doe",
	"username": "J_Doe_23",
	"email": "john.doe@mail.com",
	"password": "abc123",
	"address_info": {
		"address": "Rua das palmeiras",
		"number": "20",
		"zipCode": "25013-340",
		"city": "Rio de Janeiro",
		"state": "Rio de Janeiro",
		"complement": "condominio gaivotas"
	},
	"payment_info": {
		"name": "John Doe",
		"cardNo": "2452374993562234",
		"cvvNo": "123",
		"expireDate": "12/31",
		"cpf": "16203209792"
	}
}
```

## 1.1 - User Address Routes (Pronto)

### 1.1.1 - Create User Address

- POST /users/addresses
- User token expected
- Expected body request example:

```json
{
	"street": "street name",
	"number": "77",
	"zipCode": "77777-777",
	"city": "Curitiba",
	"state": "PR",
	"complement": "Apartamento"
}
```

### 1.1.2 - List User Address

- GET /users/addresses
- User token expected

### 1.1.3 - Update User Address

- PATCH /users/addresses/:address_id
- User token expected
- User requesting the update must be related to the address_id.
- Request must contain any of the following properties.
- Expected body request example:

```json
{
	"street": "street name",
	"number": "77",
	"zipCode": "77777-777",
	"city": "Curitiba",
	"state": "PR",
	"complement": "Apartamento"
}
```

### 1.1.4 - Delete User Address

- DELETE /users/addresses/:address_id
- User token expected
- User requesting the update must be related to the address_id.

---

### 1.0.2 - List User Profile

- GET /users/profile
- No request body needed.
- User token required.

### 1.0.3 - Update User

- PATCH /users/:user_id
- User token required.
- Expected body request example:

```json
{
	"exemplo": "exemplo",
	"exemplo_address": {
		"exemplo": "lorem400"
	},
	"exemplo_payment": {
		"exemplo": "lemrem400"
	}
}
```

### 1.0.4 - User Soft Delete

- PATCH /users/delete/deactivate
- No request body needed.
- User token required.

### 1.0.5 - User Delete

- DELETE /users/:user_id
- No request body needed.
- User token required.

---

## 1.2 - User Paymento_Info Routes (Pronto)

### 1.2.1 - Create User Paymento_Info

- POST /users/payment_info
- User token expected
- Expected body request example:

```json
{
	"userId": "2f913dd4-1cfa-4f40-8e81-cf6bad66ed63",
	"name": "example",
	"cardNo": "2452374993562234",
	"cvvNo": "950",
	"expireDate": "12/31",
	"cpf": "16203204290"
}
```

### 1.2.2 - List User Paymento_Info

- GET /users/payment_info
- User token expected

### 1.2.3 - Update User Paymento_Info

- PATCH /users/payment_info/:payment_info_id
- User token expected
- User requesting the update must be related to the payment_info_id.
- Request must contain any of the following properties.
- Expected body request example:

```json
{
	"street": "street name",
	"number": "77",
	"zipCode": "77777-777",
	"city": "Curitiba",
	"state": "PR",
	"complement": "Apartamento"
}
```

### 1.2.4 - Delete User Paymento_Info

- DELETE /users/payment_info/:payment_info_id
- User token expected
- User requesting the update must be related to the payment_info_id.

---

## 2 - Restaurant Routes (Pronto)

### 2.1 - Create Restaurant

- POST /restaurants
- Expected body request example:

```json
{
	"name": "KenzieBurger",
	"description": "Best burgers of all time!",
	"email": "kenzie2@mail.com",
	"password": "123456",
	"cnpj": "00.494.159/0001-00",
	"phoneNumber": "6689467123",
	"category": "Fast Food",
	"address": {
		"street": "Avenida Herculano Teixeira da Rocha",
		"number": "47",
		"zipCode": "35745-933",
		"city": "Andiroba",
		"state": "MG",
		"complement": ""
	}
}
```

### 2.2 - Uploading Image For Restaurant Avatar

- POST /restaurants/uploadImage/:id
- Expected file format (.JPEG, .PNG, .SVG)
- Expected request example:

```
const form = new FormData();
form.append("image", "C:\\Users\\User\\Desktop\\Burger.png");

const options = {
method: 'POST',
headers: {
'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0ZWY3NGNlLTE2YjMtNDU5Yy1iODM5LTI5MjI3NzRjMTJjYSIsImlzUmVzdGF1cmFudCI6dHJ1ZSwiaWF0IjoxNjYzMDI0NDAzLCJleHAiOjE2NjMxMTA4MDN9.GDxIF7WmkY-Ckl0CWLzZdj9Gaawvg6HJNDZ_2z2RVk0'
}
};

options.body = form;

fetch('http://codelivery.com/restaurants/uploadImage/${restaurant_id}', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
```

### 2.3 - List all restaurants

- GET /restaurants
- No Authorization required.

### 2.4 - Get Restaurant Profile

- GET /restaurants/profile
- Restaurant token expected.
- This endpoint will return all information about the restaurant which is sending the request.

### 2.5 - Update Restaurant

- PATCH /restaurants/:restaurant_id
- Restaurant token expected.
- To proceed your token must match the {restaurant_id} you are trying to update.
- Property "name", "email" and "cnpj" must be unique.
- Expected body request example:

```json
{
	"name": "Example",
	"description": "Example",
	"email": "Example@mail.com",
	"password": "123456",
	"cnpj": "99.99.999/0001-00",
	"phoneNumber": "99999999999",
	"address": {
		"street": "Avenida Kenzie",
		"number": "99",
		"zipCode": "99999-999",
		"city": "Brasilia",
		"state": "DF",
		"complement": ""
	}
}
```

### 2.6 - Delete Restaurant

- DELETE /restaurants/:restaurant_id
- Restaurant token expected.
- To proceed your token must match the {restaurant_id} you are trying to delete.
- No body request expected.

---

## 3 - Session Routes (Pronto)

### 3.1 - User Login

- POST /users/login
- Expected body request example:

```json
{
	"email": "example@email.com",
	"password": "examplePass"
}
```

### 3.2 - Restaurant Login

- POST /restaurants/login
- Expected body request example:

```json
{
	"email": "example@email.com",
	"password": "examplePass"
}
```

---

## 4 - Product Routes

### 4.1 - List All Products

- GET /products

### 4.2 - List Single Product

- GET /products/:product_id

### 4.3 - Create Product

- POST /products
- Restaurant token expected.
- Expected body request example:

```json
{
	"exemplo": "exemplo",
	"exemplo_address": {
		"exemplo": "lorem400"
	},
	"exemplo_payment": {
		"exemplo": "lemrem400"
	}
}
```

### 4.4 - Update Product

- PATCH /products/:product_id
- Restaurant token expected.
- To proceed you must own the {product_id} you are trying to delete.
- Expected body request example:

```json
{
	"exemplo": "exemplo",
	"exemplo_address": {
		"exemplo": "lorem400"
	},
	"exemplo_payment": {
		"exemplo": "lemrem400"
	}
}
```

### 4.5 - Delete Product

- DELETE /products/:product_id
- Restaurant token expected.
- To proceed you must own the {product_id} you are trying to delete.

### 4.6 - Uploading Product Image

- POST /products/uploadImage/:product_id
- Expected file format (.JPEG, .PNG, .SVG)
- Expected request example:

```
const form = new FormData();
form.append("image", "C:\\Users\\User\\Desktop\\Burger.png");

const options = {
method: 'POST',
headers: {
'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0ZWY3NGNlLTE2YjMtNDU5Yy1iODM5LTI5MjI3NzRjMTJjYSIsImlzUmVzdGF1cmFudCI6dHJ1ZSwiaWF0IjoxNjYzMDI0NDAzLCJleHAiOjE2NjMxMTA4MDN9.GDxIF7WmkY-Ckl0CWLzZdj9Gaawvg6HJNDZ_2z2RVk0'
}
};

options.body = form;

fetch('http://codelivery.com/products/uploadImage/${product_id}', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
```

## 5 - Cart Routes (Pronto)

### 5.1 - List Products From Cart

- GET /cart
- User token expected.

### 5.2 - Add Product To Cart

- POST /cart
- User token expected.
- The UUID of the product that is going to be added must be provided in the body request.
- Expected body request example:

```json
{
	"prodId": "3057de03-978e-4172-b076-f6d9dbeecb44"
}
```

### 5.3 - Remove Product From Cart

- DELETE /cart/:product_id
- User token expected.
- product ID must be provided on the URL as a parameter.

---

## 6 - Restaurant Categories Routes (Pronto)

### 6.1 - List all restaurant categories

- GET /restaurant_categories

### 6.2 - List all restaurant from specified category

- GET /restaurant_categories/:category_id/restaurants
- {category_id} must be provided correctly

---

## 7 - Product Categories Routes (Pronto)

### 7.1 - List all product categories

- GET /products_categories

### 7.2 - List all products from specified category

- GET /products_categories/:category_id/products
- {category_id} must be provided correctly
