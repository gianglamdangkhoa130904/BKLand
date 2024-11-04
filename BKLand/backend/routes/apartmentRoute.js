import express from 'express';
import { Apartment } from '../models/apartmentModel.js';
import { Building } from '../models/buildingModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { sellingPrice, rentPrice, numberOfBedroom, numberOfToilet, direction, floor, buildingID } = req.body;

    if (!sellingPrice || !rentPrice || !numberOfBedroom || !numberOfToilet || !direction || !buildingID) {
      return res.status(400).json({
        message: 'Send all required fields: Selling Price, Rent Price, Bedrooms, Toilets, Direction, Building ID',
      });
    }
    
    const buildingExists = await Building.findById(buildingID);
    if (!buildingExists) {
      return res.status(404).json({ message: 'Building not found' });
    }

    const newApartment = new Apartment({
      sellingPrice,
      rentPrice,
      numberOfBedroom,
      numberOfToilet,
      direction,
      floor,
      buildingID,
    });

    const createdApartment = await newApartment.save();
    res.status(201).json(createdApartment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create apartment' });
  }
});
  
//route này dùng để cập nhật Apartment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { sellingPrice, rentPrice, numberOfBedroom, numberOfToilet, direction, floor, buildingID } = req.body;

  try {
    // Check if the building exists
    const buildingExists = await Building.findById(buildingID);
    if (!buildingExists) {
      return res.status(404).json({ message: 'Building not found' });
    }

    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      { sellingPrice, rentPrice, numberOfBedroom, numberOfToilet, direction, floor, buildingID },
      { new: true }
    ).populate('buildingID', 'buildingName');

    if (!updatedApartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    return res.status(200).json({ message: 'Apartment updated successfully', data: updatedApartment });
  } catch (error) {
    console.error('Error updating apartment:', error.message);
    res.status(500).json({ message: 'Failed to update apartment' });
  }
});

  // Route này dùng để xoá Apartment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const apartment = await Apartment.findById(id);
    
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    const buildingCount = await Building.countDocuments({ _id: apartment.buildingID });

    if (buildingCount > 0) {
      return res.status(400).json({ message: 'Cannot delete apartment because it is linked to a building' });
    }

    await Apartment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete apartment' });
  }
});
  router.get('/', async (req, res) => {
    const { building } = req.query; 
    try {
      const apartments = building
        ? await Apartment.find({ buildingID: building }).populate('buildingID', 'buildingName')
        : await Apartment.find({}).populate('buildingID', 'buildingName');
  
      res.status(200).json({ data: apartments });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch apartments' });
    }
  });
  router.get('/building/:buildingID', async (request, response) => {
    try {
        const { buildingID } = request.params;
      const objects = await Apartment.find({buildingID: buildingID}).populate('buildingID');
  
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
// Lấy ra thông tin chi tiết của toà nhà
router.get('/buildingDetails/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const buildingDetails = await Building.findById(id).populate('subdivision', 'subdivisionName subdivisionDescription');
    if (!buildingDetails) {
      return res.status(404).json({ message: 'Building not found' });
    }

    const apartments = await Apartment.find({ buildingID: id }).populate('buildingID', 'buildingName');

    res.status(200).json({
      building: buildingDetails,
      apartments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch building details with apartments' });
  }
});

export default router;