import { Parking } from '../entity/Parking';
import {
    createParking,
    deleteParking,
    getParking,
    getParkings,
    updateParking,
    getTopParkings
} from '../repository/parking.repository';

import { ValidationsExceptions } from '../middlewares/exceptions/exceptions.error'
import { validFieldsAllowsUpdate } from '../utils/validateFieldsUpdate';

export const getParkingService = async (query: object, id: number) => {
    return await getParking(query, id)
}

export const getParkingsService = async (query: object) => {
    return await getParkings(query)
}

export const createParkingService = async (data: Parking) => {
    return await createParking(data)
}

export const updateParkingService = async (updateData: Parking, id: number) => {

    const fieldsAllows = ['name', 'capacity', 'costByHour']

    const dataUpdateValid = await validFieldsAllowsUpdate(fieldsAllows, updateData)

    const parking = await getParking({}, id)

    if (updateData.capacity && parking?.vehicles.length > updateData.capacity)
        throw new ValidationsExceptions('No se puede actualizar la capacidad del parqueadero, si su capacidad actual es mayor a la que se desea modificar ')

    if (!parking) return null

    return await updateParking(dataUpdateValid, id)

}

export const deleteParkingService = async (id: number) => {
    return await deleteParking(id)
}


export const getTopParkingsService = async () => {
    return await getTopParkings()
}