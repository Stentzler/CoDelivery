# API Endpoints

**BASE_URL: https://codelivery-api.herokuapp.com**

[1 - User Routes](https://github.com/Stentzler/CoDelivery#1---user_routes)  
[2 - Restaurant Routes](https://github.com/Stentzler/CoDelivery#2---restaurant-routes)  
[3 - Session Routes](https://github.com/Stentzler/CoDelivery#3---session-routes)  
[4 - Product Routes](https://github.com/Stentzler/CoDelivery#4---product-routes)  
[5 - Cart Routes](https://github.com/Stentzler/CoDelivery#5---cart-routes)  
[6 - Restaurant Categories Routes](https://github.com/Stentzler/CoDelivery#6---restaurant-categories-routes)  
[7 - Product Categories Routes](https://github.com/Stentzler/CoDelivery#7---product-categories-routes)

## 1 - User Routes

### 1.1 - Create User

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

### 1.2 - List User Profile

- GET /users/profile
- No request body needed.
- User token required.

### 1.3 - Update User

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

### 1.4 - User Soft Delete

- PATCH /users/delete/deactivate
- No request body needed.
- User token required.

### 1.5 - User Delete

- DELETE /users/:user_id
- No request body needed.
- User token required.

---

## 2 - Restaurant Routes

### 2.1 - Create Restaurant

- POST /restaurants
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

### 2.2 - Uploading Image For Restaurant Avatar

- POST /restaurants/uploadImage/:id
- Expected body request example:

```json
{
	"exemplo": "exemplo"
}
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

### 2.6 - Delete Restaurant

- DELETE /restaurants/:restaurant_id
- Restaurant token expected.
- To proceed your token must match the {restaurant_id} you are trying to delete.
- No body request expected.

---

## 3 - Session Routes

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
- Restaurant token expected.
- To proceed you must own this {product_id}.
- Expected body request example:

```json
{
	"exemplo": "exemplo"
}
```

---

## 5 - Cart Routes

### 5.1 - Add Product To Cart

- POST /cart
- User token exprected.
- Expected body request:

```json
{
	"prodId": "3057de03-978e-4172-b076-f6d9dbeecb44"
}
```

### 5.2 - Remove Product From Cart

- DELETE /cart/:product_id
- User token expected.

---

## 6 - Restaurant Categories Routes

### 6.1 - List all restaurant categories

- GET /restaurant_categories

### 6.2 - List all restaurant from specified category

- GET /restaurant_categories/:category_id/restaurants
- {category_id} must be provided correctly

---

## 7 - Product Categories Routes

### 7.1 - List all product categories

- GET /products_categories

### 7.2 - List all products from specified category

- GET /products_categories/:category_id/products
- {category_id} must be provided correctly
