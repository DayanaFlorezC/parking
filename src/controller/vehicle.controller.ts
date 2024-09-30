import { Request, Response } from "express";
import { Httpresponse } from "../utils/response/http.response";

import {
    createRegisterService,
    deleteRegisterService,
    getRegisterService,
    getRegistersService,
    updateRegisterService
} from "../services/vehicle.service";

const httpResponse = new Httpresponse()

export const createRegisterController = async (req: any, res: Response) =>{
    try {

        const data = req.body;
        data.idPartner = req.id 
        const register = await createRegisterService(data);

        if(!register) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, register)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}

export const getRegisterController = async (req: Request, res: Response) =>{
    try {

        const query = req.query || {}
        const {id} = req.params

        const resp = await getRegisterService(query, +id)

        if(!resp) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, resp)
        
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}
export const getRegistersController = async (req: Request, res: Response) =>{
    try {
        const query = req.query || {}
        const resp = await getRegistersService(query)

        if(!resp) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, resp)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const updateRegisterController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const data = req.body
        const resp = await updateRegisterService(data, +id)

        if(!resp) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, resp)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const deleteRegisterController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const resp = await deleteRegisterService(+id)

        if(!resp) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, resp)
        
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}
