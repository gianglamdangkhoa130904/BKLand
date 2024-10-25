import express from 'express';
import { Province } from '../models/provinceModel.js';
import { Project } from '../models/projectModel.js'; // Import Project model

const router = express.Router();

// Thêm mới tỉnh
router.post('/', async (request, response) => {
    try {
        const { provinceName } = request.body;

        // Kiểm tra xem tên tỉnh có được gửi lên hay không
        if (!provinceName) {
            return response.status(400).send({
                message: 'Please provide the province name.',
            });
        }

        // Tạo tỉnh mới
        const newProvince = await Province.create({ provinceName });
        return response.status(201).send({
            message: 'Province created successfully',
            data: newProvince,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Cập nhật tỉnh
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { provinceName } = request.body;

        // Kiểm tra xem tên tỉnh có được cung cấp hay không
        if (!provinceName) {
            return response.status(400).send({
                message: 'Province name cannot be empty.',
            });
        }

        const updatedProvince = await Province.findByIdAndUpdate(
            id,
            { provinceName },
            { new: true }
        );

        if (!updatedProvince) {
            return response.status(404).json({ message: 'Province not found.' });
        }

        return response.status(200).send({
            message: 'Province updated successfully',
            data: updatedProvince,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Xóa tỉnh
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Kiểm tra xem có dự án nào liên kết với tỉnh này không
        const hasRelatedProjects = await Project.exists({ province: id });

        if (hasRelatedProjects) {
            return response.status(400).json({
                message: 'Cannot delete this province as it is associated with existing projects.',
            });
        }

        // Nếu không có dự án liên kết, thực hiện xóa
        const deletedProvince = await Province.findByIdAndDelete(id);

        if (!deletedProvince) {
            return response.status(404).json({ message: 'Province not found.' });
        }

        return response.status(200).send({ message: 'Province deleted successfully' });
    } catch (error) {
        console.error('Error during province deletion:', error);
        response.status(500).send({ message: 'Error deleting province', error: error.message });
    }
});

// Lấy danh sách các tỉnh
router.get('/', async (request, response) => {
    try {
        const provinces = await Province.find({});
        return response.status(200).json({
            count: provinces.length,
            data: provinces,
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
