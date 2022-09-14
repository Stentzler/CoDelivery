# API Endpoints

**BASE_URL: https://codelivery-api.herokuapp.com**

- [1.0 - User Routes](https://github.com/Stentzler/CoDelivery#10---user-routes-pronto)
- &nbsp;&nbsp;&nbsp;&nbsp; [1.1 - User Address Routes](https://github.com/Stentzler/CoDelivery#11---user-address-routes-pronto)
- &nbsp;&nbsp;&nbsp;&nbsp; [1.2 - User Paymento_Info Routes](https://github.com/Stentzler/CoDelivery#12---user-paymento_info-routes-pronto)
- [2 - Restaurant Routes](https://github.com/Stentzler/CoDelivery#2---restaurant-routes-pronto)
- [3 - Session Routes](https://github.com/Stentzler/CoDelivery#3---session-routes-pronto)
- [4 - Product Routes](https://github.com/Stentzler/CoDelivery#4---product-routes)
- [5 - Cart Routes](https://github.com/Stentzler/CoDelivery#5---cart-routes-pronto)
- [6 - Restaurant Categories Routes](https://github.com/Stentzler/CoDelivery#6---restaurant-categories-routes-pronto)
- [7 - Product Categories Routes](https://github.com/Stentzler/CoDelivery#7---product-categories-routes-pronto)
- [8 - Order Products Routes](https://github.com/Stentzler/CoDelivery#8---order-products-routes)

## 1.0 - User Routes (Pronto)

### 1.0.1 - Create User

- POST /users
- Expected body request example:

```json
{
	"fullName": "John Doe",
	"userName": "John",
	"email": "user@mail.com",
	"password": "1234"
}
```

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
	"fullName": "New Name",
	"userName": "NewName"
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

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

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

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

## 1.2 - User Payment \_Info Routes (Pronto)

### 1.2.1 - Create User Payment_Info

- POST /users/payment_info/:user_id
- Expected body request example:

```json
{
	"name": "example",
	"cardNo": "2452374993562234",
	"cvvNo": "950",
	"expireDate": "12/31",
	"cpf": "16203204290"
}
```

### 1.2.2 - List User Payment_Info

- GET /users/payment_info/:user_id
- User id must be provided as parameter
- User token expected

### 1.2.3 - Update User Payment_Info

- PATCH /users/payment_info/:user_id
- User id must be provided as parameter
- User token expected
- User requesting the update must be related to the payment_info_id.
- Request must contain any of the following properties.
- Expected body request example:

```json
{
	"name": "example",
	"cardNo": "2452374993562234",
	"cvvNo": "950",
	"expireDate": "12/31",
	"cpf": "16203204290"
}
```

### 1.2.4 - Delete User Payment_Info

- DELETE /users/payment_info/:user_id
- User id must be provided as parameter
- User token expected
- User requesting the update must be related to the payment_info_id.

---

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

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
- Supported media types: (.jpg, .jpe, jpeg, .png, .svg, .webp, .pdf, .bmp, .bw, .flif, .heif, .heic, .ico, .arw, .cr2, .tif, .tiff, .ply, .wdp, .jxr, .hdp & .gif)
- Expected fetch request example:

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

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

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

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

## 4 - Product Routes

### 4.1 - List All Products

- GET /products

### 4.2 - List Single Product

- GET /products/:product_id
- Product id must be provided as parameter

### 4.3 - Create Product

- POST /products
- Restaurant token expected.
- Expected body request example:

```json
{
	"name": "coca cola",
	"description": "lata coca-cola 350ml",
	"price": 3.99,
	"category": "Drinks"
}
```

### 4.4 - Update Product

- PATCH /products/:product_id
- Product id must be provided as parameter
- Restaurant token expected.
- To proceed you must own the {product_id} you are trying to update.
- Expected body request example:

```json
{
	"name": "coca",
	"description": "lata coca-cola 350ml",
	"price": 3.29,
	"category": "Fast Food"
}
```

### 4.5 - Delete Product

- DELETE /products/:product_id
- Product id must be provided as parameter
- Restaurant token expected.
- To proceed you must own the {product_id} you are trying to delete.

### 4.6 - Uploading Product Image

- POST /products/uploadImage/:product_id
- Restaurant token reqeuired
- Supported media types: (.jpg, .jpe, jpeg, .png, .svg, .webp, .pdf, .bmp, .bw, .flif, .heif, .heic, .ico, .arw, .cr2, .tif, .tiff, .ply, .wdp, .jxr, .hdp & .gif)
- Expected fetch request example:

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

---

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

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

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

## 6 - Restaurant Categories Routes (Pronto)

### 6.1 - List all restaurant categories

- GET /restaurant_categories

### 6.2 - List all restaurant from specified category

- GET /restaurant_categories/:category_id/restaurants
- {category_id} must be provided correctly

---

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

## 7 - Product Categories Routes (Pronto)

### 7.1 - List all product categories

- GET /products_categories

### 7.2 - List all products from specified category

- GET /products_categories/:category_id/products
- {category_id} must be provided correctly

---

[Back to navigation menu](https://github.com/Stentzler/CoDelivery#api-endpoints)

---

## 8 - Order Products Routes
