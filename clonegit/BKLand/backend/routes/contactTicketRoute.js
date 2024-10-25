import express from 'express';
import { ContactTicket } from '../models/contactTicketModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.customerName ||
        !request.body.phoneNumber ||
        !request.body.email ||
        !request.body.projectID
      ) {
        return response.status(400).send({
          message: 'Send all required fields: Name, Phone number, Email, Project',
        });
      }
      else{
          const newObject = {
            customerName: request.body.customerName,
            phoneNumber: request.body.phoneNumber,
            email: request.body.email,
            projectID: request.body.projectID
            };
          const object = await ContactTicket.create(newObject);
          return response.status(201).send(object);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  router.put('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await ContactTicket.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'ContactTicket not found' });
      }
  
      return response.status(200).send({ message: 'ContactTicket updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await ContactTicket.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'ContactTicket not found' });
      }
  
      return response.status(200).send({ message: 'ContactTicket deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
      const objects = await ContactTicket.find({});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const objects = await ContactTicket.findOne({_id: id});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
export default router;