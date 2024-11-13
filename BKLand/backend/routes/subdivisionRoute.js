import express from 'express';
import { Subdivision } from '../models/subdivisionModel.js';

const router = express.Router();

// Tạo một subdivision mới
router.post('/', async (req, res) => {
  try {
    const { subdivisionName, subdivisionDescription, project } = req.body;

    if (!subdivisionName || !subdivisionDescription || !project) {
      return res.status(400).json({
        message: 'Send all required fields: Name, Description, Project',
      });
    }

    const newSubdivision = new Subdivision({
      subdivisionName,
      subdivisionDescription,
      project,
    });

    const createdSubdivision = await newSubdivision.save();
    res.status(201).json(createdSubdivision);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create subdivision' });
  }
});

// Cập nhật một subdivision theo ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSubdivision = await Subdivision.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedSubdivision) {
      return res.status(404).json({ message: 'Subdivision not found' });
    }

    res.status(200).json({ message: 'Subdivision updated successfully', data: updatedSubdivision });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update subdivision' });
  }
});

// Xóa một subdivision nhưng kiểm tra điều kiện
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const subdivision = await Subdivision.findById(id);
    
    if (!subdivision) {
      return res.status(404).json({ message: 'Subdivision not found' });
    }

    const projectCount = await Project.countDocuments({ _id: subdivision.project }); // Check if the subdivision's project exists

    if (projectCount > 0) {
      return res.status(400).json({ message: 'Cannot delete subdivision because it is linked to a project' });
    }

    await Subdivision.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subdivision deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subdivision' });
  }
});
// Lấy tất cả các subdivision 
router.get('/', async (req, res) => {
  const { project } = req.query;
  try {
    const subdivisions = project
      ? await Subdivision.find({ project }).populate('project', 'projectName')
      : await Subdivision.find({}).populate('project', 'projectName');

    res.status(200).json({ data: subdivisions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subdivisions' });
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
// Xem chi tiết của một phân khu
router.get('/:id', async (req, res) => {
  try {
    const subdivision = await Subdivision.findById(req.params.id).populate('project');
    if (!subdivision) {
      return res.status(404).json({ message: 'Subdivision not found' });
    }
    res.status(200).json(subdivision);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subdivision details' });
  }
});
export default router;