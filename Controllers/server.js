const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
// to read razorpay key and security key from .env file
const dotenv = require('dotenv');
dotenv.config();
//create an instance of express
const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('mongodb connected');
});
//middleware to read content of req apis
app.use(express.json({ extended: false }));
//schema for orders
const OrderSchema = mongoose.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});
//model
const Order = mongoose.model('Order', OrderSchema);
//API
//to get razorpay key
app.get('/get-razorpay-key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});
//order in razorpay
app.post('/create-order', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };
    //connect razorpay and create an order for us
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});
//pay order api
app.post('/pay-order', async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/list-orders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
