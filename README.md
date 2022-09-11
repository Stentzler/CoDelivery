# API Endpoints

Base_URL: (ARRUMAR depois do deploy)

## Users

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
-

### User Delete

- DELETE /users/:user_id

- No request body needed.
- User token required.

---

## Restaurants

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
- You are only able to proceed if your token matches the {restaurant_id} you are trying to update.
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
- You are only able to proceed if your token matches the {restaurant_id} you are trying to delete.
- No body request expected.

---
