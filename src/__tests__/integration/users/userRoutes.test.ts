import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedUser200 } from "../../mocks";
import { randomNumberGenerator } from "../../../utils/randomRemover";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - Should be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("userName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isRestaurant");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("addressInfo");
    expect(response.body).toHaveProperty("cart");
    expect(response.body).toHaveProperty("paymentInfo");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.addressInfo).toHaveProperty("id");
    expect(response.body.addressInfo).toHaveProperty("address");
    expect(response.body.addressInfo).toHaveProperty("number");
    expect(response.body.addressInfo).toHaveProperty("zipCode");
    expect(response.body.addressInfo).toHaveProperty("city");
    expect(response.body.addressInfo).toHaveProperty("state");
    expect(response.body.addressInfo).toHaveProperty("complement");
    expect(response.body.cart).toHaveProperty("id");
    expect(response.body.cart).toHaveProperty("price");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.isRestaurant).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /users - Shouldn't be able to create a user with an already registered email", async () => {
    const response = await request(app).post("/users").send(mockedUser200);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users - Shouldn't be able to create a user with missing information 1 - User data", async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();
    // Deleting a random property to avoid playing the system
    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.email;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.full_name;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.username;
        break;
      default:
        // @ts-expect-error
        delete newUser.password;
    }

    const response = await request(app).post("/users").send(newUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users - Shouldn't be able to create a user with missing information 2 - User address info", async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.address_info.address;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.address_info.city;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.address_info.zipCode;
        break;
      default:
        // @ts-expect-error
        delete newUser.address_info.state;
    }

    const response = await request(app).post("/users").send(newUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users - Shouldn't be able to create a user with missing information 3 - User payment info", async () => {
    const newUser = { ...mockedUser200 };
    const value = randomNumberGenerator();

    switch (value) {
      case 0:
        // @ts-expect-error
        delete newUser.payment_info.cardNo;
        break;
      case 1:
        // @ts-expect-error
        delete newUser.payment_info.cpf;
        break;
      case 2:
        // @ts-expect-error
        delete newUser.payment_info.cvvNo;
        break;
      default:
        // @ts-expect-error
        delete newUser.payment_info.expireDate;
    }

    const response = await request(app).post("/users").send(newUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
