import express from 'express';
import { Subdivision } from '../models/subdivisionModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.subdivisionName ||
        !request.body.subdivisionDescription ||
        !request.body.project
      ) {
        return response.status(400).send({
          message: 'Send all required fields: Name, Description, Project',
        });
      }
      else{
          const newObject = {
            subdivisionName: request.body.subdivisionName,
            subdivisionDescription: request.body.subdivisionDescription,
            project: request.body.project
            };
          const object = await Subdivision.create(newObject);
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
  
      const result = await Subdivision.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Subdivision not found' });
      }
  
      return response.status(200).send({ message: 'Subdivision updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Subdivision.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Subdivision not found' });
      }
  
      return response.status(200).send({ message: 'Subdivision deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/', async (request, response) => {
    try {
      const objects = await Subdivision.find({});
  
      return response.status(200).json({
        count: objects.length,
        data: objects,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  router.get('/project/:projectID', async (request, response) => {
    try {
        const { projectID } = request.params;
      const objects = await Subdivision.find({project: projectID});
  
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
        const objects = await Subdivision.findOne({_id: id});
  
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