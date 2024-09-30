import { Vehicle } from '../entity/Vehicle';
import {
    createRegister,
    deleteRegister,
    getRegister,
    getRegisters,
    updateRegister,
    getRegisterWithoutDateOut
} from '../repository/register.repository';

import {
    getParking
} from '../repository/parking.repository'

import { ValidationsExceptions } from "../exceptions/exceptions.error"



export const getRegisterService = async (query: object, id: number) => {
    return await getRegister(query, id)
}

export const getRegistersService = async (query: object) => {
    return await getRegisters(query)
}

export const createRegisterService = async (data: Vehicle) => {
    try {
        const { placa, parkingId } = data
        const register = await getRegisterWithoutDateOut({ placa, parkingId })

        if (register) return {
            exception: true,
            msg: "Ya existe un registro en el parqueadero con dicha placa"
        }

        //validacion de capacidad
        const parking = await getParking({}, parkingId)

        if (!parking) return {
            exception: true,
            msg: "No existe el parqueadero"
        }

        if (parking.capacity < parking.vehicles.length) return {
            exception: true,
            msg: "No hay espacio"
        }

        return await createRegister(data)
    } catch (error) {
        console.log(error)
        throw new Error("Error en el servicio crear entrada de vehiculo");
    }

}

export const updateRegisterService = async (updateData: Vehicle, id: number) => {
    return await updateRegister(updateData, id)
}

export const deleteRegisterService = async (id: number) => {
    return await deleteRegister(id)
}

export const createExitRegisterVehService = async (placa: string, parkingId: number) => {

    try {
        const register = await getRegisterWithoutDateOut({ placa, parkingId })

        if (!register) return {
            exception: true,
            msg: 'El registro no existe en la base de datos'
        }

        const parking = await getParking({}, parkingId)

        if (!parking) return {
            exception: true,
            msg: 'El parqueadero no existe'
        }

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

        const resp = await updateRegister(updateData, id)
        return resp
    } catch (error) {
        console.log(error)
        throw new Error("Error en el servicio crear salida de vehiculo");

    }

}