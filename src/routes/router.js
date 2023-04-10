import { Router as ExpressRouter } from 'express'
import jwt from "jsonwebtoken"
export default class Router {
    constructor() {
        this.router = ExpressRouter()
        this.init()
    }
    getRouter() {
        return this.router
    }

    // get(path, roles, ...cb) {
    // this.router.get(path, this.manejarRoles(roles), this.generarRespuestas, this.manejarCB(cb))
    get(path, ...cb) {
        this.router.get(path, this.generarRespuestas, this.manejarCB(cb))
    }
    post(path, ...cb) {
        this.router.post(path, this.generarRespuestas, this.manejarCB(cb))
    }
    put(path, ...cb) {
        this.router.put(path, this.generarRespuestas, this.manejarCB(cb))
    }
    delete(path, ...cb) {
        this.router.delete(path, this.generarRespuestas, this.manejarCB(cb))
    }


    manejarCB(callbacks) {
        return callbacks.map(cb => async (...params) => {
            try {
                await cb.apply(this, params)
            } catch (error) {
                console.log(error)
            }
        })
    }

    generarRespuestas(req, res, next) {

        res.sucess = (message) => res.json({ status: 'sucess', message })

        res.error = (message) => res.json({ status: 'error', error: message })
        next()
    }

    manejarRoles(roles) {
        return (req, res, next) => {
            if (roles.includes('PUBLIC')) return next()
            const authHeader = req.get('Authorization')
            if (!authHeader) return res.json({ message: 'Not authorized' })

            const token = authHeader.split(' '[1])

            const userToken = jwt.verify(token, 'secretJWT')
            if (!userToken) return res.json({ message: 'Not authorized' })

            if (roles.includes(userToken.user.role)) return next()
            res.json({ message: 'Not authorized' })
        }
    }
}