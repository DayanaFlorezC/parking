import { Vehicle } from '../entity/Vehicle';
import {
    createRegister,
    deleteRegister,
    getRegister,
    getRegisters,
    updateRegister
} from '../repository/register.repository';

export const getRegisterService = async (query: object, id: number) =>{
    try {
        return await getRegister(query, id) 
    } catch (error) {
        console.log(error)
    }
}

export const getRegistersService = async (query : object) =>{
    try {
        return await getRegisters(query)
    } catch (error) {
        console.log(error)
    }
}

export const createRegisterService = async (data: Vehicle) =>{
    try {
        return await createRegister(data)
    } catch (error) {
        console.log(error)
    }
}

export const updateRegisterService = async (updateData: Vehicle, id: number) =>{
    try {
        return await updateRegister(updateData, id)
    } catch (error) {
        console.log(error)
    }
}

export const deleteRegisterService = async (id: number) =>{
    try {
        return await deleteRegister(id)
    } catch (error) {
        console.log(error)
    }
}