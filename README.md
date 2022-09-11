# API Endpoints

**BASE_URL: https://codelivery-api.herokuapp.com**

## User Routes

### Create User

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

### List User Profile

- GET /users/profile
- No request body needed.
- User token required.

### Update User

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

### User Soft Delete

- PATCH /users/delete/deactivate
- No request body needed.
- User token required.

### User Delete

- DELETE /users/:user_id
- No request body needed.
- User token required.

---

## Restaurant Routes

### Create Restaurant

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

### Uploading Image For Restaurant Avatar

- POST /restaurants/uploadImage/:id
- Expected body request example:

```json
{
	"exemplo": "exemplo"
}
```

### List all restaurants

- GET /restaurants
- No Authorization required.

### Get Restaurant Profile

- GET /restaurants/profile
- Restaurant token expected.
- This endpoint will return all information about the restaurant which is sending the request.

### Update Restaurant

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

### Delete Restaurant

- DELETE /restaurants/:restaurant_id
- Restaurant token expected.
- To proceed your token must match the {restaurant_id} you are trying to delete.
- No body request expected.

---

## Session Routes

### User Login

- POST /users/login
- Expected body request example:

```json
{
	"email": "example@email.com",
	"password": "examplePass"
}
```

### Restaurant Login

- POST /restaurants/login
- Expected body request example:

```json
{
	"email": "example@email.com",
	"password": "examplePass"
}
```

---

## Product Routes

### List All Products

- GET /products

### List Single Product

- GET /products/:product_id

### Create Product

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

### Update Product

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

### Delete Product

- DELETE /products/:product_id
- Restaurant token expected.
- To proceed you must own the {product_id} you are trying to delete.

### Uploading Product Image

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

## Cart Routes

### Add Product To Cart

- POST /cart
- User token exprected.
- Expected body request:

```json
{
	"prodId": "3057de03-978e-4172-b076-f6d9dbeecb44"
}
```

### Remove Product From Cart

- DELETE /cart/:product_id
- User token expected.

---

## Restaurant Categories Routes

### List all restaurant categories

- GET /restaurant_categories

### List all restaurant from specified category

- GET /restaurant_categories/:category_id/restaurants
- {category_id} must be provided correctly

---

## Product Categories Routes

### List all product categories

- GET /products_categories

### List all products from specified category

- GET /products_categories/:category_id/products
- {category_id} must be provided correctly
