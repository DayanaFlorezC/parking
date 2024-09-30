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

export const getUserService = async (id: number) => {
    return await getUser(id)
}

export const getUsersService = async (query: object) => {
    return await getUsers(query)
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
        throw new Error("Error in create user service");
    }
}


export const updateUserService = async (updateData: User, id: number) => {
    try{
        return await updateUser(updateData, id)
    }catch(error){
        console.log(error)
        throw new Error("Error servicio editar usuario");
        
    }
   
}


export const deleteUserService = async (id: number) => {
    return await deleteUser(id)
}

export const loginService = async (email: string, password: string) => {
    try {
        const users = await getUsers({ email: email })

        if (!users || !users.length) return {
            exception: true,
            msg: 'No se encontro el usuario'
        }

        //?compare password
        const user = users[0]

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return {
            exeption: true,
            msg: 'La contraseña no coincide'
        }

        const secret = process.env.secretKeyJWT

        //?create token
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, secret + '', { expiresIn: '6h' });
        return {token}

    } catch (error) {
        console.log(error)
       throw new Error("Error in login user service");
    }
}

export const sendEmailService = (data: any) =>{
    try {
        //!TODO
        return 'ok'
    } catch (error) {
        console.log(error)
        throw new Error("Error en send email");
        
    }
}