import app from './app';
import AppDataSource from './data-source';

import {categoriesQueryBuilder} from './utils/categoriesQueryBuilder';

(async () => {
	await AppDataSource.initialize().catch(err => {
		console.error('Error during Data Source initialization', err);
	});
	//await categoriesQueryBuilder();

	const port = process.env.PORT || 3000;

	app.listen(port, () => {
		console.log('Servidor executando');
	});
})();
