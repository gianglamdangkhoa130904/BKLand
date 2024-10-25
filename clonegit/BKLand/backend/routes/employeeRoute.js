import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();

// 1. GET - Lấy danh sách tất cả nhân viên
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employees', error });
    }
});

// 2. POST - Thêm một nhân viên mới
// 2. POST - Thêm một nhân viên mới
router.post('/', async (req, res) => {
    const {
        username,
        password,
        name,
        email,
        phone,
        dob,
        nationality,
        statusAccount = 'active', // Đặt mặc định là 'active' nếu không có trong request
        role = 'Employee' // Đặt mặc định là 'Admin' nếu không có trong request
    } = req.body;

    try {
        // Kiểm tra ràng buộc đầu vào (chỉ là ví dụ, kiểm tra thêm tùy yêu cầu)
        if (!username || !password || !name || !email) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newEmployee = new Employee({
            username,
            password,
            name,
            email,
            phone,
            dob,
            nationality,
            statusAccount,
            role,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
});


// 3. PUT - Cập nhật thông tin của một nhân viên dựa trên ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, name, email, phone, dob, nationality, statusAccount, role } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                username,
                password,
                name,
                email,
                phone,
                dob,
                nationality,
                statusAccount,
                role,
            },
            { new: true, runValidators: true } // `new: true` để trả về bản ghi đã cập nhật, `runValidators` để áp dụng các ràng buộc khi cập nhật
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});

// 4. DELETE - Xóa một nhân viên dựa trên ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

export default router;
