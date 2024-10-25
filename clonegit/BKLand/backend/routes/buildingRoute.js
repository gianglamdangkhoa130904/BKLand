import express from 'express';
import { Building } from '../models/buildingModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.buildingName ||
        !request.body.buildingDescription ||
        !request.body.subdivision
      ) {
        return response.status(400).send({
          message: 'Send all required fields: Name, Description, Subdivision',
        });
      }
      else{
          const newObject = {
            buildingName: request.body.buildingName,
            buildingDescription: request.body.buildingDescription,
            subdivision: request.body.subdivision
            };
          const object = await Building.create(newObject);
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
  
      const result = await Building.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Building not found' });
      }
  
      return response.status(200).send({ message: 'Building updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Building.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Building not found' });
      }
  
      return response.status(200).send({ message: 'Building deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
      const objects = await Building.find({});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/subdivision/:subdivisionID', async (request, response) => {
    try {
        const { subdivisionID } = request.params;
      const objects = await Building.find({subdivision: subdivisionID});
  
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
        const objects = await Building.findOne({_id: id});
  
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