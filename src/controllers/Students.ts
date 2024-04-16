import { Response, Request } from "express";
import Students from "../models/Students";
import mongoose, { Types } from "mongoose";

export async function createStudent(req: Request, res: Response) {
  try {
    const { program, year, semester, major, block } = req.body;
    
    const student = new Students({
      _id: new mongoose.Types.ObjectId(),
      program,
      year,
      semester,
      major,
      block,
    });

    const savedStudent = await student.save();

    res.status(201).json({ student: savedStudent });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readStudent(req: Request, res: Response) {
    try {
      const studentID = req.params.studentID;
      const student = await Students.findById(studentID).select('-__v');
        
      student
        ? res.status(200).json({ student }) 
        : res.status(404).json({ message: "Not found" });
        
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };  

export async function readAllStudents(req: Request, res: Response) {
    try {
      const students = await Students.find().select('-__v'); 
      res.status(200).json({ students }); 
    } catch (error) {
      res.status(500).json({ error }); 
      res.render('error', { error: error });
    }
  };

export async function updateStudent(req: Request, res: Response) {
  try {
    const studentID = req.params.studentID;
    console.log('Student ID:', studentID);
    const student = await Students.findById(studentID);

    if (student) {
      student.set(req.body);
      const updatedStudent = await student.save();
      return res.status(200).json({ students: updatedStudent });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteStudent(req: Request, res: Response) {
    try {
      const studentID = req.params.studentID; 
      const result = await Students.findByIdAndDelete(studentID);
      
      return result
        ? res.status(204).send() 
        : res.status(404).json({ message: "Not found" });
    } catch (error) {
      res.status(500).json({ error });
      res.render('error', { error: error });
    }
  };
  