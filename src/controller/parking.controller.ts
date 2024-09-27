import { Request, Response } from "express";

import {
    createParkingService,
    updateParkingService,
    getParkingService,
    getParkingsService,
    deleteParkingService
} from '../services/parking.service'

export const getParkingController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const query = req.query  || {}
        const parking = await getParkingService(query, +id)

        if(!parking) return res.status(400).json({
            message: 'No se encontró el parqueadero'
        })

        res.json({parking, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const getParkingsController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const query = req.query  || {}
        const parking = await getParkingsService(query)

        if(!parking) return res.status(400).json({
            message: 'No se encontró el parqueadero'
        })

        res.json({parking, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const updateParkingController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const data = req.body;

        const resp = await updateParkingService(data, +id)

        if(!resp) return res.status(400).json({
            message: 'No se encontró el parqueadero'
        })

        res.json({parking: resp, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const deleteParkingController = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params;

        const resp = await deleteParkingService(+id)

        if(!resp) return res.status(400).json({
            message: 'No se encontró el parqueadero'
        })

        res.json({parking: resp, message: 'ok'})
    } catch (error) {
        console.log(error)
    }
}


export const createParkingController = async (req: Request, res: Response) =>{
    try {
        const data = req.body;
  
        const resp = await createParkingService(data)
        
        if (!resp) return res.status(400).json(null)
    
        return res.json(data);
    } catch (error) {
        console.log(error)
    }
}