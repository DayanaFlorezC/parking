import { Request, Response } from "express";
import { Httpresponse } from "../middlewares/response/http.response"

const httpResponse = new Httpresponse()

import {
  getUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
  createUserService,
  loginService,
  sendEmailService,
  getTopPartnersIndService
} from '../services/user.service'
import { ValidationsExceptions } from "../middlewares/exceptions/exceptions.error";


export const getUsers = async (req: any, res: Response) => {
  try {

    const query = req.query || {}
    const users = await getUsersService(query)
    if (!users) return httpResponse.NotFound(res, 'Error al obtener los usuarios')
    return httpResponse.OK(res, users)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }
};


export const getUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const userLog = req.user

    if (userLog.role !== 'admin' && userLog.id !== +id) return httpResponse.Forbbiden(res, 'No autorizado')

    const user = await getUserService(+id)
    if (!user) return httpResponse.NotFound(res, 'No se pudo obtener el usuario')
    return httpResponse.OK(res, user)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
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

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }


};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const resp = await loginService(email, password)

    if (!resp) return httpResponse.NotFound(res, 'No se pudo loggear el usuario')

    return httpResponse.OK(res, resp)

  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }
}

export const updateUser = async (req: any, res: Response) => {
  const { id } = req.params;

  const user = req.user;

  if (user.id === +id) return httpResponse.Forbbiden(res, 'No se puede editar el admin')

  try {

    const resp = await updateUserService(req.body, +id)

    if (!resp?.affected) return httpResponse.NotFound(res, 'User not found')

    return httpResponse.OK(res, 'Usuario editado con éxito')
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteUserService(+id)

    if (!result?.affected)
      return httpResponse.NotFound(res, 'User not found');

    return httpResponse.OK(res, 'Usuario borrado con éxito')
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }
};


export const sendEmailController = async (req: any, res: Response ) =>{
  try {
    const data = req.body;

    const result = await sendEmailService(data)

    if(!result) return httpResponse.NotFound(res, 'No se puedo enviar el correo electrónico');
    
    return httpResponse.OK(res, result)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }

}


export const getTopPartnersIndControllers = async (req: Request, res: Response) =>{
  try {
    const resp = await getTopPartnersIndService()
    if(!resp) return httpResponse.NotFound(res, 'not found');
    return httpResponse.OK(res, resp)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return httpResponse.Error(res, error.message)
    }

    if(error instanceof ValidationsExceptions){
      return httpResponse.BadRequest(res, error.message)
    }
  }

}
