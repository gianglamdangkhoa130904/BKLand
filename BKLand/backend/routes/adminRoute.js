import express from 'express';
import { Admin } from '../models/adminModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.username ||
        !request.body.password 
      ) {
        return response.status(400).send({
          message: 'Send all required fields: orderType, orderDescription, orderAmount, orderStatus, customerID',
        });
      }
      else{
          const order = await Admin.create(request.body);
          return response.status(201).send(order);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
router.get('/username/:username', async (request, response) => {
    try {
      const { username } = request.params;
      const admin = await Admin.findOne({ username: username });
      response.status(200).json(admin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.get('/', async (request, response) => {
    try {
      const admin = await Admin.find();
      response.status(200).json(admin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const admin = await Admin.findByIdAndUpdate(id, request.body);
        return response.status(201).send(admin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const admin = await Admin.findByIdAndDelete(id);
        return response.status(201).send(admin);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});
export default router;