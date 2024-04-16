import express from "express";
import { createStudent, readStudent, readAllStudents, updateStudent, deleteStudent } from "../controllers/Students";


const router = express.Router();

router.post('/create', createStudent);
router.get('/get/:studentID', readStudent);
router.get('/get/', readAllStudents);
router.put('/update/:studentID', updateStudent);
router.delete('/delete/:studentID', deleteStudent);

export default router;