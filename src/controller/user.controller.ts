import { Request, Response } from "express";
import { Httpresponse } from "../utils/response/http.response"

const httpResponse = new Httpresponse()

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
    if (!users) return httpResponse.NotFound(res, 'Error al obtener los usuarios')
    return httpResponse.OK(res, users)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserService(+id)
    if (!user) return httpResponse.NotFound(res, 'No se pudo obtener el usuario')
    return httpResponse.OK(res, user)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }
};

export const createUser = async (req: any, res: Response) => {

  try {
    const data = req.body;

    const resp = await createUserService(data)

    if (!resp) return httpResponse.NotFound(res, 'No se pudo crear el usuario')
    return httpResponse.OK(res, resp)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }


};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const resp = await loginService(email, password)

    if (!resp) return httpResponse.NotFound(res, 'No se pudo loggear el usuario')

    if (resp.exception) return httpResponse.NotFound(res, resp.msg)

      return httpResponse.OK(res, resp)

  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const resp = await updateUserService(req.body, +id)

    if(!resp) return httpResponse.NotFound(res, 'User not found')

    return httpResponse.OK(res, resp)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserService(+id)

    if (!result)
      return httpResponse.NotFound(res, 'User not found');

    return httpResponse.OK(res, result)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }
  }
};


