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

### Update User

## Restaurants

### List all restaurants

- GET /restaurants

- No Authorization required.

### Get Restaurant Profile

- GET /restaurants/profile

- Restaurant Authorization expected.

- This endpoint will return all information about the restaurant which is sending the request.

### Create Restaurant

- POST /restaurants

- Expected body request example:

```json
{
	"name": "X-Burger",
	"description": "Best burgers in town",
	"email": "xburger@mail.com",
	"password": "abc123",
	"cnpj": "99.999.999/0001-00",
	"category": "Fast Food",
	"restaurant_address": {
		"address": "Avenida Herculano Teixeira da Rocha",
		"number": "99",
		"phoneNumber": "99999999999",
		"zipCode": "35745-932",
		"city": "Andiroba",
		"state": "MG",
		"complement": ""
	}
}
```

### Update Restaurant

- PATCH /restaurants/{restaurant_id}

- Restaurant Authorization expected.

- You are only able to update information if your token matches the {restaurant_id} you are trying to update.

- Expected body request example:

```json
{
	"name": "X-Burger",
	"description": "Best burgers in town",
	"email": "xburger@mail.com",
	"password": "abc123",
	"cnpj": "99.999.999/0001-00",
	"category": "Fast Food",
	"restaurant_address": {
		"address": "Avenida Herculano Teixeira da Rocha",
		"number": "99",
		"phoneNumber": "99999999999",
		"zipCode": "35745-932",
		"city": "Andiroba",
		"state": "MG",
		"complement": ""
	}
}
```

### Delete Restaurant

DELETE /restaurants/{restaurant_id}

- Restaurant Authorization expected.

- You are only able to proceed if your token matches the {restaurant_id} you are trying to delete.

- PS: All products belonging to the restaurant are going to be deleted as well.
