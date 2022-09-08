import app from './app';
import AppDataSource from './data-source';

import { categoriesQueryBuilder } from './utils/categoriesQueryBuilder';

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
  await categoriesQueryBuilder();

  app.listen(3001, () => {
    console.log('Servidor executando');
  });
})();
