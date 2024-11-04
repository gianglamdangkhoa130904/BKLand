import express from 'express';
import { Project } from '../models/projectModel.js';

const router = express.Router();

// route này dùng để thêm dữ liệu mới vào
router.post('/', async (req, res) => {
  try {
    const { projectName, projectDescription, projectImage, province, projectType } = req.body;

    if (!projectName || !projectDescription || !projectImage || !province || !projectType) {
      return res.status(400).json({
        message: 'Send all required fields: Name, Description, Image, Province, Project type',
      });
    }

    const newProject = {
      projectName,
      projectDescription,
      projectImage,
      province,
      projectType,
    };

    const project = await Project.create(newProject);
    return res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).send({ message: error.message });
  }
});

// route này dùng để cập nhật dữ liệu
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { projectName, projectDescription, projectImage, province, projectType } = request.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { projectName, projectDescription, projectImage, province, projectType },
      { new: true }
    )
      .populate('province', 'provinceName')
      .populate('projectType', 'projectTypeName');

    if (!updatedProject) {
      return response.status(404).json({ message: 'Project not found' });
    }

    return response.status(200).json({ message: 'Project updated successfully', data: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error.message);
    response.status(500).send({ message: error.message });
  }
});


// route này dùng để xoá dữ liệu có điều kiện 
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return response.status(404).json({ message: 'Project not found' });
    }

    return response.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


//route này dùng để fetch tất cả các dự án có trong database
router.get('/', async (request, response) => {
  try {
    const projects = await Project.find({})
      .populate('province', 'provinceName')
      .populate('projectType', 'projectTypeName');

    return response.status(200).json({
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/province/:provinceID', async (request, response) => {
  try {
    const { provinceID } = request.params;
    const projects = await Project.find({ province: provinceID })
      .populate('province', 'provinceName')
      .populate('projectType', 'projectTypeName');

    return response.status(200).json({
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get projects by project type ID
router.get('/projectType/:projectTypeID', async (request, response) => {
  try {
    const { projectTypeID } = request.params;
    const projects = await Project.find({ projectType: projectTypeID })
      .populate('province', 'provinceName')
      .populate('projectType', 'projectTypeName');

    return response.status(200).json({
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route này dùng để lấy thông tin chi tiết của Project
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id)
      .populate('province', 'provinceName') // Chỉ lấy trường provinceName
      .populate('projectType', 'projectTypeName'); // Chỉ lấy trường projectTypeName
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project details' });
  }
});
export default router;
