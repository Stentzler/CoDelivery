import AppDataSource from '../../data-source';
import { Restaurant } from '../../entities/restaurant.entity';
import { IRestaurantCreate } from '../../interfaces/restaurants';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { RestaurantAddress } from '../../entities/restaurantAddress.entity';
import { RestaurantCategory } from '../../entities/restaurantCategory.entity';

const createRestaurantService = async ({
  name,
  description,
  email,
  password,
  cnpj,
  category,
  img_url,
  restaurantAddress,
}: IRestaurantCreate) => {
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const restaurantAddressRepo = AppDataSource.getRepository(RestaurantAddress);
  const restaurantCategoryRepo =
    AppDataSource.getRepository(RestaurantCategory);

  const restaurantNameDupe = await restaurantRepo.findOne({ where: { name } });

  if (restaurantNameDupe) {
    throw new AppError('Restaurant name already exists');
  }

  const restaurantCNPJDupe = await restaurantRepo.findOne({ where: { cnpj } });

  if (restaurantCNPJDupe) {
    throw new AppError('Given CNPJ is already registered', 409);
  }

  const emailDupe = await restaurantRepo.findOne({ where: { email } });

  if (emailDupe) {
    throw new AppError('Email is already being used', 409);
  }

  const zipCodeDupe = await restaurantAddressRepo.findOne({
    where: { zipCode: restaurantAddress.zipCode },
  });

  if (zipCodeDupe) {
    throw new AppError('Zipcode already registered', 409);
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

  const newRestaurantAddress = new RestaurantAddress();

  newRestaurantAddress.address = restaurantAddress.address;
  newRestaurantAddress.number = restaurantAddress.number;
  newRestaurantAddress.phoneNumber = restaurantAddress.phoneNumber;
  newRestaurantAddress.zipCode = restaurantAddress.zipCode;
  newRestaurantAddress.city = restaurantAddress.city;
  newRestaurantAddress.state = restaurantAddress.state;
  newRestaurantAddress.complement =
    restaurantAddress.complement || 'Not specified';

  restaurantAddressRepo.create(newRestaurantAddress);
  await restaurantAddressRepo.save(newRestaurantAddress);

  const targetRestaurantAddress = await restaurantAddressRepo.findOne({
    where: { zipCode: newRestaurantAddress.zipCode },
  });

  const newRestaurant = new Restaurant();

  newRestaurant.name = name;
  newRestaurant.description = description;
  newRestaurant.email = email;
  newRestaurant.password = bcrypt.hashSync(password, 10);
  newRestaurant.cnpj = cnpj;
  newRestaurant.img_url =
    img_url ||
    'https://res.cloudinary.com/dffnwue8t/image/upload/v1662581503/l4kg5doufmuuyvgrgj7u.png';
  newRestaurant.category = targetCategory;
  newRestaurant.restaurantAddress = targetRestaurantAddress!;

  restaurantRepo.create(newRestaurant);
  await restaurantRepo.save(newRestaurant);

  return newRestaurant;
};

export { createRestaurantService };
