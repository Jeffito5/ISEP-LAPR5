/* eslint-disable prettier/prettier */
import { Router } from 'express';
import user from './routes/userRoute';
import auth from './routes/userRoute';
var cors = require('cors');

export default () => {
	const app = Router();
	app.use(cors());
	user(app);
	auth(app);

	return app
}