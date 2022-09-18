import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource(
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: ['src/entities/*.ts'],
      }
    : {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        synchronize: false,
        logging: true,
        entities:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/entities/*.js']
            : ['src/entities/*.ts'],
        migrations:
          process.env.NODE_ENV === 'production'
            ? ['dist/src/migrations/*.js']
            : ['src/migrations/*.ts'],
      }
);

export default AppDataSource;

// : {
// 		type: 'postgres',
// 		host: process.env.DB_HOST,
// 		port: 5432,
// 		username: process.env.POSTGRES_USER,
// 		password: process.env.POSTGRES_PWD,
// 		database: process.env.POSTGRES_DB,
// 		synchronize: false,
// 		logging: true,
// 		entities: ['src/entities/*.ts'],
// 		migrations: ['src/migrations/*.ts'],
//   }

// {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : false,
//   synchronize: false,
//   logging: true,
//   entities:
//     process.env.NODE_ENV === 'production' ? ['dist/src/entities/*.js'] : ['src/entities/*.ts'],
//   migrations:
//     process.env.NODE_ENV === 'production'
//       ? ['dist/src/migrations/*.js']
//       : ['src/migrations/*.ts'],
// }
