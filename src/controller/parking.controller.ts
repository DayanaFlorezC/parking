import { Request, Response } from "express";
import { Httpresponse } from "../utils/response/http.response";

import {
    createParkingService,
    updateParkingService,
    getParkingService,
    getParkingsService,
    deleteParkingService
} from '../services/parking.service'

const httpResponse = new Httpresponse()

export const getParkingController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = req.query || {}
        const parking = await getParkingService(query, +id)

        if (!parking) return httpResponse.NotFound(res, 'Parking not found');

        return httpResponse.OK(res, parking)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const getParkingsController = async (req: Request, res: Response) => {
    try {
        const query = req.query || {}
        const parking = await getParkingsService(query)

        if (!parking) return httpResponse.NotFound(res, 'Parking not found');

        return httpResponse.OK(res, parking)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const updateParkingController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const resp = await updateParkingService(data, +id)

        if (!resp) return httpResponse.NotFound(res, 'Parking not found');

        return httpResponse.OK(res, resp)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const deleteParkingController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const resp = await deleteParkingService(+id)

        if (!resp) return httpResponse.NotFound(res, 'Parking not found');

        return httpResponse.OK(res, resp)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}


export const createParkingController = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const resp = await createParkingService(data)

        if (!resp) return httpResponse.NotFound(res, 'Parking not found');

        return httpResponse.OK(res, resp)
    } catch (error) {
        if (error instanceof Error) {
            return httpResponse.Error(res, error.message)
        }
    }
}