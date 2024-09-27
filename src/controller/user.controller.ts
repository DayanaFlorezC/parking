import { Request, Response } from "express";

interface UserBody {
  name: string;
  email: string;
  password: string;
  role: string,
}

import {
  getUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
  createUserService, 
  loginService
} from '../services/user.service'


export const getUsers = async (req: Request, res: Response) => {
  try {

    const query = req.query || {}
    const users = await getUsersService(query)
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserService(+id)

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {

  try {
    const data = req.body;
  
    const resp = await createUserService(data)

    if (!resp) return res.status(400).json(null)

    return res.json(data);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'x' })
  }


};


export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    const token = await loginService(email, password)

    if(!token) return res.status(400).json(null)

    res.json(token)

  } catch (error) {
    console.log(error)
    res.status(400)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    await updateUserService(req.body, +id)

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserService(+id)

    if (!result)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


