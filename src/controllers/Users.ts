import { Response, Request } from "express";
import Users from "../models/Users";
import mongoose from "mongoose";

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = new Users({
      _id: new mongoose.Types.ObjectId(),
      username,
      password,
    });

    const savedUser = await user.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    const user = await Users.findById(userID).select('-__v');

    user
      ? res.status(200).json({ user })
      : res.status(404).json({ message: "Not found" });

  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function readAllUsers(req: Request, res: Response) {
  try {
    const users = await Users.find().select('-__v');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function updateUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    console.log('User ID:', userID);
    const user = await Users.findById(userID);

    if (user) {
      user.set(req.body);
      const updatedUser = await user.save();
      return res.status(200).json({ users: updatedUser });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

export async function deleteUser(req: Request, res: Response) {
  try {
    const userID = req.params.userID;
    const result = await Users.findByIdAndDelete(userID);

    return result
      ? res.status(204).send()
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ error });
    res.render('error', { error: error });
  }
};

// Login route handler
export async function loginUser(req: Request, res: Response) {
  try {
    let { username, password } = req.query;

    // Convert username to string
    username = String(username);

    // Find the user by username
    const user = await Users.findOne({ username });

    // If user not found or password doesn't match, return an error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If authentication is successful, return user information
    return res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
