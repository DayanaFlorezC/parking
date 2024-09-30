import { Parking } from '../entity/Parking';
import {
    createParking,
    deleteParking,
    getParking,
    getParkings,
    updateParking
} from '../repository/parking.repository';

export const getParkingService = async (query: object, id: number) =>{
        return await getParking(query, id) 
}

export const getParkingsService = async (query : object) =>{
        return await getParkings(query)
}

export const createParkingService = async (data: Parking) =>{
        return await createParking(data)
}

export const updateParkingService = async (updateData: Parking, id: number) =>{
        return await updateParking(updateData, id)
}

export const deleteParkingService = async (id: number) =>{
        return await deleteParking(id)
}