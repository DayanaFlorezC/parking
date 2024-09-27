import { Request, Response } from "express";

import {
    createRegisterService,
    deleteRegisterService,
    getRegisterService,
    getRegistersService,
    updateRegisterService
} from "../services/vehicle.service";

export const createRegisterController = async (req: Request, res: Response) =>{
    try {
        const data = req.body;
        data.idPartner = 14 //! ojo con esto
        const register = await createRegisterService(data);

        if(!register) return res.status(400).json({message: 'No se pudo realizar el registro del vehiculo'})

        res.json({register, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}

export const getRegisterController = async (req: Request, res: Response) =>{
    try {

        const query = req.query || {}
        const {id} = req.params

        const resp = await getRegisterService(query, +id)

        if(!resp) return res.status(400).json({message: 'No se pudo obtener el registro'})

        res.json({register: resp, message: 'ok'})
        
    } catch (error) {
        console.log(error)
    }
}
export const getRegistersController = async (req: Request, res: Response) =>{
    try {
        const query = req.query || {}
        const resp = await getRegistersService(query)

        if(!resp) return res.status(400).json({message: 'No se pudo obtener el registro'})

        res.json({registers: resp, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const updateRegisterController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const data = req.body
        const resp = await updateRegisterService(data, +id)

        if(!resp) return res.status(400).json({message: 'No se pudo obtener el registro'})

        res.json({register: resp, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const deleteRegisterController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const resp = await deleteRegisterService(+id)

        if(!resp) return res.status(400).json({message: 'No se pudo obtener el registro'})

        res.json({register: resp, message: 'ok'})
        
    } catch (error) {
        console.log(error)
    }
}
