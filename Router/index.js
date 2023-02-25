const express = require('express');

const route = express.Router();

const locationController = require('../Controllers/Locations');
const mealtypesController = require('../Controllers/mealtypes');
const RestrauntsController = require('../Controllers/Restraunts');
const UsersController = require('../Controllers/Users');
const itemController = require('../Controllers/Items');
const OrderController = require('../Controllers/Order');
const MenuitemsController = require('../Controllers/Menuitems')
const paymentGatewayController = require('../Controllers/Payments');


route.get('/locations', locationController.getLocation);
route.get('/mealtypes', mealtypesController.getmealtypes);
route.get('/restraunts/:locId',RestrauntsController.getRestrauntsBylocId);
route.post('/userlogin',UsersController.userLogin);
route.post('/userSignUp',UsersController.userSignUp);
route.get('/restraunt/:resId', RestrauntsController.getRestrauntsByresId);
route.get('/menuitems/:resid',MenuitemsController.getMenuitemsByResId);
route.post('/order', OrderController.saveOrderDetails);
route.get('/orders/:userId',OrderController.getOrderByUserId);
route.post('/filter',RestrauntsController.restrauntFilter);
route.post('/payment', paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);

// route.get('/users', UsersController.getUsers);
// route.get('/items', itemController.getItems);
// route.get('/restraunts/:locId', RestrauntsController.getRestrauntsBylocId);
module.exports = route;
