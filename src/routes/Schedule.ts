import express from "express";
import { readOptions, deleteAllOptions, createSchedule } from "../controllers/Schedule";
    //  readAllPrograms, readProgram, readSched, readAllSched, 

const router = express.Router();

router.post('/create', createSchedule)
router.get('/get/', readOptions);
router.delete('/delete/all', deleteAllOptions)
// router.get('/get/:scheduleID', readAllPrograms);
// router.get('/get/:scheduleID/:programID', readProgram);
// router.get('/getSched/:scheduleID/:programID', readAllSched);
// router.get('/getSched/:scheduleID/:programID/:schedID', readSched);

export default router;