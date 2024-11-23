import express from 'express';
import { Order } from '../models/orderModel.js';
const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.orderType ||
        !request.body.orderDescription ||
        !request.body.orderAmount ||
        !request.body.orderStatus ||
        !request.body.customerID
      ) {
        return response.status(400).send({
          message: 'Send all required fields: orderType, orderDescription, orderAmount, orderStatus, customerID',
        });
      }
      else{
          const newObject = {
            orderType: request.body.orderType,
            orderDescription: request.body.orderDescription,
            orderAmount: request.body.orderAmount,
            orderStatus: request.body.orderStatus,
            customerID: request.body.customerID
            };
          const order = await Order.create(newObject);
          return response.status(201).send(order);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
router.get('/user/:userID', async (request, response) => {
    try {
        const { userID } = request.params;
        const orders = await Order.find({customerID: userID}).populate('customerID');
  
        return response.status(200).json({
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const order = await Order.findByIdAndUpdate(id, request.body);
        return response.status(201).send(order);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const order = await Order.findByIdAndDelete(id);
        return response.status(201).send(order);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
router.get('/:orderID', async (request, response) => {
  try {
      const { orderID } = request.params;
      const orders = await Order.find({_id: orderID}).populate('customerID');

      return response.status(200).json(orders);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});
export default router;
