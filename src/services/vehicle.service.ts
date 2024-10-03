import { Vehicle } from '../entity/Vehicle';
import {
    createRegister,
    deleteRegister,
    getRegister,
    getRegisters,
    updateRegister,
    getRegisterWithoutDateOut,
    getTopVeh,
    getTopVehOneParking,
    getFirstVeh,
    getEarnings,
    getEarningsToday,
    getEarningsLastWeek,
    getEarningsLastMonth,
    getEarningsLastYear
} from '../repository/register.repository';

import {
    getParking
} from '../repository/parking.repository'

import { ValidationsExceptions, ValidationExceptionForbiden } from "../middlewares/exceptions/exceptions.error"



export const getRegisterService = async (query: object, id: number) => {
    return await getRegister(query, id)
}

export const getRegistersService = async (query: object) => {
    return await getRegisters(query)
}

export const createRegisterService = async (data: Vehicle) => {
    const { placa, parkingId, partnerId } = data

    const register = await getRegisterWithoutDateOut({ placa })

    if (register) throw new ValidationsExceptions('Ya existe un registro con dicha placa sin salida registrada')

    const parking = await getParking({}, parkingId)

    if (!parking) throw new ValidationsExceptions("No existe el parqueadero")

    if(parking?.userId !== +partnerId) throw new ValidationExceptionForbiden('No tienes permiso para agregar un nuevo registro a este parqueadero')

    if (parking.capacity < parking.vehicles.length + 1) throw new ValidationsExceptions("No hay espacio")

    return await createRegister(data)

}

export const updateRegisterService = async (updateData: Vehicle, id: number ) => {
    return await updateRegister(updateData, id)
}

export const deleteRegisterService = async (id: number) => {
    return await deleteRegister(id)
}

export const createExitRegisterVehService = async (placa: string, parkingId: number, partnerId: number) => {

    const register = await getRegisterWithoutDateOut({ placa, parkingId })

    if (!register) throw new ValidationsExceptions('El registro no existe en la base de datos')

    const parking = await getParking({}, parkingId)

    if (!parking) throw new ValidationsExceptions('El parqueadero no existe')

    if(parking?.userId !== +partnerId) throw new ValidationsExceptions('No tienes permiso para agregar un nuevo registro a este parqueadero')

    let hours = Math.abs(new Date().getTime() - register.dateIn.getTime()) / 36e5;

    const mod = hours % 1;

    if (mod) {
        hours = Math.ceil(hours);
    }

    const total = parking.costByHour * hours

    const updateData = {
        dateOut: new Date(),
        cost: total
    }

    const id = register.id

    return await updateRegister(updateData, id)

}


export const getTopVehService = async (parkingId: number, type: string) => {


    switch (type) {
        case "all":
            return await getTopVeh()
        case "first":
            return await getFirstVeh(parkingId)
        case "one":
            return await getTopVehOneParking(parkingId)
        default:
            return false
    }

}


export const getEarningsService = async (type: string, parkingId: number) => {

    switch (type) {
        case 'all':
            return await getEarnings(parkingId)
        case 'today':
            return await getEarningsToday(parkingId)
        case 'lastweek':
            return await getEarningsLastWeek(parkingId)
        case 'lastmonth':
            return await getEarningsLastMonth(parkingId)
        case 'lastyear':
            return await getEarningsLastYear(parkingId)

        default:
            return false
    }

}