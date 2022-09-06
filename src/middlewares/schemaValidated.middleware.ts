import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const schemaValidatedMiddleware =
  (schema: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
    const data = request.body;
    const validatedDate = await schema.validate(data);
    request.body = validatedDate;
    next();} 
    catch(error){   
        if(error instanceof Error){
            
            return response.status(400).json({name:error.name,message:error.message})
        }
    }
  };


export {schemaValidatedMiddleware}