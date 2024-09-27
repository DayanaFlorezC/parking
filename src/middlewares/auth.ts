
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
    user?: any
  }

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) =>{
    try {
        
        const token = req.headers["authorization"];

        if(!token) return res.status(401).json('acceso denegado')

            const tokenWithoutBearer = token.split(' ')[1]

            let decoded;
    
            if(tokenWithoutBearer=== undefined){
                 decoded = jwt.verify(token, 'secretKey');
            }else{
                decoded = jwt.verify(tokenWithoutBearer, 'secretKey');
            }
    
            req.user = decoded;
            next()
    } catch (error) {
        console.log(error)
        res.status(401).json('acceso denegado')
    }
}
