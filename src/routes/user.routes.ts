import { Router, RequestHandler } from "express";

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    sendEmailController
} from '../controller/user.controller'

import {
    authMiddleware,
    authAdmin,
} from '../middlewares/auth'

const router = Router();

router.get('/user',
    authMiddleware as RequestHandler,
    getUsers as RequestHandler
)

router.get("/user/:id", 
    authMiddleware as RequestHandler, 
    getUser as RequestHandler
);

router.post("/user", 
    authMiddleware as RequestHandler, 
    authAdmin as RequestHandler, 
    createUser as RequestHandler
);

router.put("/user/:id", 
    authMiddleware as RequestHandler, 
    authAdmin as RequestHandler, 
    updateUser as RequestHandler
);

router.delete("/user/:id", 
    authMiddleware as RequestHandler, 
    authAdmin as RequestHandler, 
    deleteUser as RequestHandler
);

router.post("/user/login", login as RequestHandler)

router.post("/user/email", sendEmailController as RequestHandler)



export default router;