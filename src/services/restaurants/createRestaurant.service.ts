import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { IRestaurantCreate } from '../../interfaces/restaurants';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { RestaurantCategory } from '../../entities/restaurantCategory.entity';
import { Address } from '../../entities/address.entity';

const createRestaurantService = async ({
  name,
  description,
  email,
  password,
  cnpj,
  phoneNumber,
  category,
  img_url,
  address,
}: IRestaurantCreate) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const addressRepo = AppDataSource.getRepository(Address);
  const restaurantCategoryRepo =
    AppDataSource.getRepository(RestaurantCategory);

  const restaurantNameDupe = await restaurantRepo.findOne({ where: { name } });

  if (restaurantNameDupe) {
    throw new AppError('Restaurant name already exists', 409);
  }

  const restaurantCNPJDupe = await restaurantRepo.findOne({ where: { cnpj } });

  if (restaurantCNPJDupe) {
    throw new AppError('Given CNPJ is already registered', 409);
  }

  const emailDupe = await restaurantRepo.findOne({ where: { email } });

  if (emailDupe) {
    throw new AppError('Email is already being used', 409);
  }

  let formattedCategory = '';

  // Formatting category string so that:
  // - First letter is always uppercase
  // - Rest of the string is always lowercase
  // E.g.: Bakery, Cafe, Pizzeria

  // This if statement checks for composed words;
  // For example, imagine we had a "Fast Food" category,
  // if we don't check for composed words, "formattedCategory"
  // would be equal to "Fast food", thus making it irregular
  // when compared with the mocked data in categoriesQueryBuilder.ts

  if (category.split(' ').join('').length < category.length) {
    let words = category.split(' ').map((word) => {
      // Making every word start with an uppercase letter, when there are multiple words
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });

    formattedCategory = words.join(' ');
  } else {
    formattedCategory =
      category[0].toUpperCase() + category.slice(1).toLowerCase();
  }

  const targetCategory = await restaurantCategoryRepo.findOne({
    where: { name: formattedCategory },
  });

  if (!targetCategory) {
    throw new AppError('Category not found', 404);
  }

  const newRestaurantAddress = new Address();

  newRestaurantAddress.address = address.address;
  newRestaurantAddress.number = address.number;
  newRestaurantAddress.zipCode = address.zipCode;
  newRestaurantAddress.city = address.city;
  newRestaurantAddress.state = address.state;
  newRestaurantAddress.complement = address.complement || 'Not specified';

  addressRepo.create(newRestaurantAddress);
  await addressRepo.save(newRestaurantAddress);

  const newRestaurant = new Restaurant();

  newRestaurant.name = name;
  newRestaurant.description = description;
  newRestaurant.email = email;
  newRestaurant.password = bcrypt.hashSync(password, 10);
  newRestaurant.cnpj = cnpj;
  newRestaurant.phoneNumber = phoneNumber;
  newRestaurant.img_url =
    img_url ||
    'https://res.cloudinary.com/dffnwue8t/image/upload/v1662581503/l4kg5doufmuuyvgrgj7u.png';
  newRestaurant.category = targetCategory;
  newRestaurant.address = newRestaurantAddress;

  restaurantRepo.create(newRestaurant);
  await restaurantRepo.save(newRestaurant);

  return newRestaurant;
};

export { createRestaurantService };
