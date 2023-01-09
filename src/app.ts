import express from 'express';
import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';
import OrderController from './controllers/OrderController';
import { CustomHandler, joiHandler } from './utils/errorHandler';

require('express-async-errors');

const app = express();
app.use(express.json());

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.get('/products', productController.getAll);
app.post('/products', productController.createProduct);

app.post('/users', userController.createUser);
app.post('/login', userController.loginUser);

app.get('/orders', orderController.getAll);
app.post('/orders', orderController.createOrder);

app.use(joiHandler);
app.use(CustomHandler);

export default app;
