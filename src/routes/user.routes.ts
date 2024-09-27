import { Router, RequestHandler } from "express";

import {
    getUsers,
    getUser, 
    createUser, 
    updateUser,
    deleteUser,
    login
} from '../controller/user.controller'

import {
authMiddleware
} from '../middlewares/auth'

const router = Router();

router.get('/user', authMiddleware as RequestHandler, getUsers as RequestHandler)

router.get("/user/:id", getUser as RequestHandler);

router.post("/user", createUser as RequestHandler);

router.put("/user/:id", updateUser as RequestHandler);

router.delete("/user/:id", deleteUser as RequestHandler);

router.post("/user/login", login as RequestHandler)



export default router;