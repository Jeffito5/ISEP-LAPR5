/* eslint-disable prettier/prettier */
import { Router } from 'express';
import camiao from './routes/camiaoRoute'
import rota from './routes/rotaRoute';
import planeamento from './routes/planeamentoRoute';
var cors = require('cors');

export default () => {
	const app = Router();
	app.use(cors());
	rota(app);
	camiao(app);
	planeamento(app);

	return app
}