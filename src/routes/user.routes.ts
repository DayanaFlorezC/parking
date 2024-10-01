import { Router, RequestHandler } from "express";

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    sendEmailController,
    getTopPartnersIndControllers
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

router.post("/user/email",
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler,
    sendEmailController as RequestHandler
)

router.get("/user/ind/partners", 
    authMiddleware as RequestHandler,
    authAdmin as RequestHandler, 
    getTopPartnersIndControllers as RequestHandler
)



export default router;