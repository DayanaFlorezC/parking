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
    createEmail
} from '../repository/user.repository'

import { ValidationsExceptions } from '../exceptions/exceptions.error'

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
    try {
        return await updateUser(updateData, id)
    } catch (error) {
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

        if (!users || !users.length) throw new ValidationsExceptions('ji')

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
        return { token }

    } catch (error) {
        console.log(error)
        throw new Error("Error in login user service");
    }
}

export const sendEmailService = async (data: any) => {
   
    try {
        //!TODO
        const uri = `http://localhost:3000/api/email`
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(response.status === 200) {
           /* await createEmail({
                to: data.email,
                from: 'mayoflorezc@gmail.com',
                subject: 'Prueba estacionamiento',
                placa: data.placa, 
                idParking: data.parqueaderoId,
                message: data.mensaje
            }) 
                */
            return true 
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        throw new Error("Error en send email");
        
    }
        
}


export const getTopPartnersIndService = () =>{
        return getTopSocios()
}