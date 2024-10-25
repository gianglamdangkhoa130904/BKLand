import express from 'express';
import { OwnershipCertificate } from '../models/ownershipCertificateModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.ticketType ||
        !request.body.customerID ||
        !request.body.apartmentID
      ) {
        return response.status(400).send({
          message: 'Send all required fields: Ticket type, Customer, Apartment',
        });
      }
      else{
          const newObject = {
            ticketType: request.body.ticketType,
            customerID: request.body.customerID,
            apartmentID: request.body.apartmentID
            };
          const object = await OwnershipCertificate.create(newObject);
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
  
      const result = await OwnershipCertificate.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Ownership Certificate not found' });
      }
  
      return response.status(200).send({ message: 'Ownership Certificate updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await OwnershipCertificate.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Ownership Certificate not found' });
      }
  
      return response.status(200).send({ message: 'Ownership Certificate deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
      const objects = await OwnershipCertificate.find({});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/user/:userID', async (request, response) => {
    try {
        const { userID } = request.params;
      const objects = await OwnershipCertificate.find({customerID: userID});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/apartment/:apartmentID', async (request, response) => {
    try {
        const { apartmentID } = request.params;
      const objects = await OwnershipCertificate.find({apartmentID: apartmentID});
  
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
        const objects = await OwnershipCertificate.findOne({_id: id});
  
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