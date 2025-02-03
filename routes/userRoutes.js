import express from 'express';
import { registerUser, loginUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/:id', authUser, getUser);  // ใช้ authUser middleware ที่นี่
userRouter.put('/:id', authUser, updateUser);  // ใช้ authUser middleware ที่นี่
userRouter.delete('/:id', authUser, deleteUser);  // ใช้ authUser middleware ที่นี่

export default userRouter;
