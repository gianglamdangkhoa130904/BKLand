import express from 'express';
import { Building } from '../models/buildingModel.js';
import { Apartment } from '../models/apartmentModel.js';
const router = express.Router();

// Tạo một building mới
router.post('/', async (req, res) => {
  try {
    const { buildingName, buildingDescription, buildingStatus, subdivision } = req.body;

    if (!buildingName || !buildingDescription || !buildingStatus || !subdivision) {
      return res.status(400).json({
        message: 'Send all required fields: Name, Description, Status, Subdivision',
      });
    }

    const newBuilding = new Building({
      buildingName,
      buildingDescription,
      buildingStatus,
      subdivision,
    });

    const createdBuilding = await newBuilding.save();
    res.status(201).json(createdBuilding);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create building' });
  }
});
  
// Cập nhật một building
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBuilding = await Building.findByIdAndUpdate(id, updatedData, { new: true })
      .populate('subdivision', 'subdivisionName subdivisionDescription');

    if (!updatedBuilding) {
      return res.status(404).json({ message: 'Building not found' });
    }

    res.status(200).json({ message: 'Building updated successfully', data: updatedBuilding });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update building' });
  }
});

// Xoá một building
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const building = await Building.findById(id);
    
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }

    await Building.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subdivision deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subdivision' });
  }
});
// Route này để hiển thị tất cả các building
router.get('/', async (req, res) => {
  const { subdivision } = req.query; 
  try {
    const buildings = subdivision
      ? await Building.find({ subdivision }).populate('subdivision', 'subdivisionName')
      : await Building.find({}).populate('subdivision', 'subdivisionName');

    res.status(200).json({ data: buildings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buildings' });
  }
});
  router.get('/subdivision/:subdivisionId', async (request, response) => {
    try {
      const { subdivisionId } = request.params;
      const buildings = await Building.find({ subdivision: subdivisionId }).populate('subdivision');
      return response.status(200).json({
        count: buildings.length,
        data: buildings,
      });
    } catch (error) {
      console.error('Error fetching buildings by subdivision:', error.message);
      response.status(500).send({ message: error.message });
    }
  });
// Lấy chi tiết
router.get('/:id', async (req, res) => {
  try {
    const building = await Building.findById(req.params.id).populate('subdivision');
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }
    res.status(200).json(building);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch building details' });
  }
});
export default router;
