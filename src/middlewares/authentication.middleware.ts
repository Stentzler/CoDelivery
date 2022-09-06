import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    const token = authorization?.split(" ")[1]

    if(!token) return res.status(401).json({message: "Missing authorization token"})
    
    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY!) 
        if(verify) next()
    } catch(error) {
        return res.status(401).json({message: "Invalid token"})
    }
}

export {authenticationMiddleware}