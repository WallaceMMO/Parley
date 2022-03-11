import { NextFunction, Request, Response } from "express";
import jwt  from 'jsonwebtoken';

export default function authMiddleware(
    request: Request, response: Response, Next: NextFunction
) {
    const {authorization} = request.headers

    if(!authorization) {
        return response.status(401)
    }

    const token = authorization.replace("Bearer", '').trim()

    try {
        const data = jwt.verify(token, 'secret')

        if(typeof data == 'string')
            throw 'data string'

        const {id} = data
        request.userId = id

    } catch (error) {
        return response.sendStatus(401)
    }

    Next()
}

