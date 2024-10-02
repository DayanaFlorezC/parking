import { User } from '../entity/User';

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


import dotenv from "dotenv"
dotenv.config()

import {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getTopSocios,
    getUserByEmail
} from '../repository/user.repository'

import { ValidationsExceptions } from '../middlewares/exceptions/exceptions.error'

import { validFieldsAllowsUpdate } from "../utils/validateFieldsUpdate"

export const getUserService = async (id: number) => {
    return await getUser(id)
}

export const getUsersService = async (query: object) => {
    return await getUsers(query)
}

export const createUserService = async (data: User) => {

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
        ...data,
        password: hashedPassword
    }

    return await createUser(user)

}


export const updateUserService = async (updateData: User, id: number) => {

    const fieldsAllows = ['name']

    const dataUpdateValid = await validFieldsAllowsUpdate(fieldsAllows, updateData)

    return await updateUser(dataUpdateValid, id)
}


export const deleteUserService = async (id: number) => {
    return await deleteUser(id)
}

export const loginService = async (email: string, password: string) => {

    const user = await getUserByEmail(email)

    if (!user) throw new ValidationsExceptions('No existe el usuario')

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new ValidationsExceptions('La contraseña no coincide')

    const secret = process.env.secretKeyJWT

    //?create token
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, secret + '', { expiresIn: '6h' });
    return { token }
}

export const sendEmailService = async (data: any) => {

    try {
        const uri = `${process.env.URI_MAILSERVIVE}/api/email`
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        throw new Error("Error en send email");

    }

}


export const getTopPartnersIndService = () => {
    return getTopSocios()
}