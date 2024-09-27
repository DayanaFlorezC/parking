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
    updateUser
} from '../repository/user.repository'

export const getUserService = async ( id: number) => {

    try {
        return await getUser(id)
    } catch (error) {
        console.log(error)
    }
}

export const getUsersService = async (query: object) => {

    try {
        return await getUsers(query)
    } catch (error) {
        console.log(error)
    }
}

export const createUserService = async (data: User) => {
    try {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = {
            ...data,
            password: hashedPassword
        }
    
        return await createUser(user)

    } catch (error) {
        console.log(error)
    }
}


export const updateUserService = async (updateData: User, id: number) => {
    try {
        return await updateUser(updateData, id)
    } catch (error) {
        console.log(error)
    }
}


export const deleteUserService = async (id: number) => {
    try {
        return await deleteUser(id)
    } catch (error) {
        console.log(error)
    }
}

export const loginService = async (email: string, password: string) => {
    try {

        const users = await getUsers({ email: email })

        if (!users || !users.length) return {
            exeption: true,
            msg: 'No se encontro el usuario'
        }

        //?compare password
        const user = users[0]

        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) return {
            exeption: true, 
            msg: 'La contraseña no coincide'
        }

        const secret = process.env.secretKeyJWT

        //?create token
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, secret+'', { expiresIn: '6h' });

        return token
    
    } catch (error) {
        console.log(error)
    }
}