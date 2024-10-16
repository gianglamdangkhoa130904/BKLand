import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - name
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           example: "DKhoa"
 *         password:
 *           type: string
 *           example: "12345"
 *         name:
 *           type: string
 *           example: "Đăng Khoa"
 *         email:
 *           type: string
 *           example: "khoa@gmail.com"
 *         phone:
 *           type: string
 *           example: "0123456789"
 *         dob:
 *           type: Date
 *           example: "13/09/2004"
 *         nationality:
 *            type: String
 *            example: "Việt Nam"
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users
 */

// Route for Register
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "DKhoa"
 *               password:
 *                 type: string
 *                 example: "12345"
 *               name:
 *                 type: string
 *                 example: "Đăng Khoa"
 *               email:
 *                 type: string
 *                 example: "khoa@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               dob:
 *                 type: Date
 *                 example: "13/09/2004"
 *               nationality:
 *                 type: String
 *                 example: "Việt Nam"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109cb"
 *                 username:
 *                   type: string
 *                   example: "DKhoa"
 *                 password:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Đăng Khoa"
 *                 email:
 *                   type: string
 *                   example: "khoa@gmail.com"
 *                 phone:
 *                   type: string
 *                   example: "0123456789"
 *                 dob:
 *                   type: Date
 *                   example: "13/09/2004"
 *                 nationality:
 *                   type: String
 *                   example: "Việt Nam"
 */
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.password ||
      !request.body.name ||
      !request.body.email
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, password, name, email',
      });
    }
    else{
        const newUser = {
            username: request.body.username,
            password: request.body.password,
            name: request.body.name,
            email: request.body.email,
            statusAccount: "active"
          };
        const user = await User.create(newUser);
        return response.status(201).send(user);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Users from database
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 */
router.get('/', async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One User from database by id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get one user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 */
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const user = await User.findById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a User
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Smith"
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60d0fe4f5311236168a109ca"
 *                 name:
 *                   type: string
 *                   example: "John Smith"
 */
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.phone ||
        !request.body.dob ||
        !request.body.nationality
    ) {
      return response.status(400).send({
        message: 'Send all required fields: phone, dob, nationality',
      });
    }
    const { id } = request.params;

    const result = await User.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a User
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get user by username
/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username to get
 *         schema:
 *           type: string
 *           example: "Dkhoa"
 *     responses:
 *       200:
 *         description: A user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109ca"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 */
router.get('/username/:username', async (request, response) => {
  try {
    const { username } = request.params;
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;