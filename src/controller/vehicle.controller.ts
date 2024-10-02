import { Request, Response } from "express";
import { Httpresponse } from "../middlewares/response/http.response";

import {
    createRegisterService,
    deleteRegisterService,
    getRegisterService,
    getRegistersService,
    updateRegisterService,
    createExitRegisterVehService,
    getTopVehService,
    getEarningsService
} from "../services/vehicle.service";
import { ValidationsExceptions } from "../middlewares/exceptions/exceptions.error";

const httpResponse = new Httpresponse()

export const createRegisterController = async (req: any, res: Response) =>{
    try {

        const data = req.body;
        data.partnerId = req.user.id;

        const register = await createRegisterService(data);

        if(!register) return httpResponse.NotFound(res, 'Register not found');

        return httpResponse.OK(res, register)
    } catch (error) {
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }

        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }

       
    }
}

export const createExitRegisterVeh = async (req: any, res: Response ) =>{
    try {
        const {placa, parkingId} = req.body;
       const result = await createExitRegisterVehService(placa, parkingId, req.user.id)

       if(!result?.affected) return httpResponse.NotFound(res, 'Register not found');

       return httpResponse.OK(res, 'Salida de vehiculo exitosa')
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
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
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
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
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
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
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
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
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}



//?Indicadores 
export const getStadisticsVehicles = async (req: Request, res: Response ) =>{
    try{

        const parkingId = req.query.parkingId || 16;
        const type = (req.query.type === undefined) ? 'all' : req.query.type+'';

        const resp =await getTopVehService(+parkingId, type);
        if(!resp) return httpResponse.NotFound(res, 'not found');

        return httpResponse.OK(res, resp)
    }catch(error){
        console.log(error)
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const getEarningsControllers = async (req: Request, res: Response) =>{
    try {

        const parkingId = req.query.parkingId || 16;
        const type = (req.query.type === undefined) ? 'all' : req.query.type+'';

        const resp = await getEarningsService(type, +parkingId)
        if(!resp) return httpResponse.NotFound(res, 'not found');

        return httpResponse.OK(res, resp)

    } catch (error) {
        console.log(error)
        if (error instanceof ValidationsExceptions) {
            return httpResponse.BadRequest(res, error.message)
        }
        
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}
