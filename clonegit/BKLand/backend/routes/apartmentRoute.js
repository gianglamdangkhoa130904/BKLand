import express from 'express';
import { Apartment } from '../models/apartmentModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.sellingPrice ||
        !request.body.rentPrice ||
        !request.body.numberOfBedroom ||
        !request.body.numberOfToilet ||
        !request.body.direction
      ) {
        return response.status(400).send({
          message: 'Send all required fields: Selling price, Rent price, Number of bedroom and toilet, Direction',
        });
      }
      else{
          const newObject = {
            sellingPrice: request.body.sellingPrice,
            rentPrice: request.body.rentPrice,
            numberOfBedroom: request.body.numberOfBedroom,
            numberOfToilet: request.body.numberOfToilet,
            direction: request.body.direction
            };
          const object = await Apartment.create(newObject);
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
  
      const result = await Apartment.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Apartment not found' });
      }
  
      return response.status(200).send({ message: 'Apartment updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Apartment.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Apartment not found' });
      }
  
      return response.status(200).send({ message: 'Apartment deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
      const objects = await Apartment.find({});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/building/:buildingID', async (request, response) => {
    try {
        const { buildingID } = request.params;
      const objects = await Apartment.find({buildingID: buildingID});
  
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
        const objects = await Apartment.findOne({_id: id});
  
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