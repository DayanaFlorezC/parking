
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface AuthRequest extends Request {
    user?: any
  }

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) =>{
    try {
        
        const token = req.headers["authorization"];

        if(!token) return res.status(401).json('acceso denegado')

            const tokenWithoutBearer = token.split(' ')[1]

            let decoded;
            const secretKey = process.env.secretKeyJWT
    
            if(tokenWithoutBearer=== undefined){
                 decoded = jwt.verify(token, secretKey+'');
            }else{
                decoded = jwt.verify(tokenWithoutBearer, secretKey+'');
            }
    
            req.user = decoded;
            next()
    } catch (error) {
        console.log(error)
        res.status(401).json('acceso denegado')
    }
}


export const authAdmin = (req: any, res: Response, next: NextFunction) => {

    try {
        if (req.user.role !== 'admin') return res.status(403).json('No autorizado')
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error')
    }
}

export const authSocio = (req: any, res: Response, next: NextFunction) => {

    try {
        if (req.user.role !== 'socio') return res.status(403).json('No autorizado')
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error')
    }
}