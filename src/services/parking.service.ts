import { Parking } from '../entity/Parking';
import {
    createParking,
    deleteParking,
    getParking,
    getParkings,
    updateParking
} from '../repository/parking.repository';

export const getParkingService = async (query: object, id: number) =>{
    try {
        return await getParking(query, id) 
    } catch (error) {
        console.log(error)
    }
}

export const getParkingsService = async (query : object) =>{
    try {
        return await getParkings(query)
    } catch (error) {
        console.log(error)
    }
}

export const createParkingService = async (data: Parking) =>{
    try {
        return await createParking(data)
    } catch (error) {
        console.log(error)
    }
}

export const updateParkingService = async (updateData: Parking, id: number) =>{
    try {
        return await updateParking(updateData, id)
    } catch (error) {
        console.log(error)
    }
}

export const deleteParkingService = async (id: number) =>{
    try {
        return await deleteParking(id)
    } catch (error) {
        console.log(error)
    }
}