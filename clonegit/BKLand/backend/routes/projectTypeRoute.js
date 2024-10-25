import express from 'express';
import { ProjectType } from '../models/projectTypeModel.js';
import { Project } from '../models/projectModel.js'; // Import Project model

const router = express.Router();

// Hàm kiểm tra ID hợp lệ của MongoDB
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// 1. POST - Thêm một loại dự án mới
router.post('/', async (request, response) => {
    try {
        const { projectTypeName } = request.body;

        // Kiểm tra nếu projectTypeName không tồn tại hoặc là chuỗi rỗng
        if (!projectTypeName || typeof projectTypeName !== 'string' || projectTypeName.trim() === '') {
            return response.status(400).send({
                message: 'Send all required fields: projectTypeName must be a non-empty string.',
            });
        }

        // Tạo đối tượng mới và lưu vào cơ sở dữ liệu
        const newObject = {
            projectTypeName: projectTypeName.trim(),
        };
        const object = await ProjectType.create(newObject);

        return response.status(201).send(object);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error creating project type', error: error.message });
    }
});

// 2. PUT - Cập nhật thông tin của một loại dự án dựa trên ID
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { projectTypeName } = request.body;

    if (!projectTypeName || !projectTypeName.trim()) {
      return response.status(400).json({ message: 'Project type name cannot be empty' });
    }

    const result = await ProjectType.findByIdAndUpdate(id, { projectTypeName }, { new: true });

    if (!result) {
      return response.status(404).json({ message: 'Project type not found' });
    }

    return response.status(200).send({ message: 'Project type updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// 3. DELETE - Xóa một loại dự án dựa trên ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Kiểm tra xem có dự án nào liên kết với loại dự án này không
        const hasRelatedProjects = await Project.exists({ projectType: id });

        if (hasRelatedProjects) {
            return response.status(400).json({
                message: 'Cannot delete this project type as it is associated with existing projects.'
            });
        }

        // Nếu không có dự án liên kết, thực hiện xóa
        const deletedProjectType = await ProjectType.findByIdAndDelete(id);

        if (!deletedProjectType) {
            return response.status(404).json({ message: 'Project type not found.' });
        }

        return response.status(200).send({ message: 'Project type deleted successfully' });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// 4. GET - Lấy danh sách tất cả các loại dự án
router.get('/', async (request, response) => {
    try {
        const objects = await ProjectType.find({});

        return response.status(200).json({
            count: objects.length,
            data: objects,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error retrieving project types', error: error.message });
    }
});

export default router;
 
