import express from "express";
import { createUser, readUser, readAllUsers, updateUser, deleteUser, loginUser } from "../controllers/Users";


const router = express.Router();

router.post('/create', createUser);
router.get('/get/:userID', readUser);
router.get('/get/', readAllUsers);
router.put('/update/:userID', updateUser);
router.delete('/delete/:userID', deleteUser);
router.get('/login', loginUser);


export default router;