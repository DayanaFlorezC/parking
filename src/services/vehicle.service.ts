import { Vehicle } from '../entity/Vehicle';
import {
    createRegister,
    deleteRegister,
    getRegister,
    getRegisters,
    updateRegister
} from '../repository/register.repository';

export const getRegisterService = async (query: object, id: number) =>{
        return await getRegister(query, id) 
}

export const getRegistersService = async (query : object) =>{
        return await getRegisters(query)
}

export const createRegisterService = async (data: Vehicle) =>{
        return await createRegister(data)
}

export const updateRegisterService = async (updateData: Vehicle, id: number) =>{
        return await updateRegister(updateData, id)
}

export const deleteRegisterService = async (id: number) =>{
        return await deleteRegister(id)
}