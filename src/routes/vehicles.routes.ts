import { Router, RequestHandler } from "express";

import {
    createRegisterController,
    deleteRegisterController,
    getRegisterController,
    getRegistersController,
    updateRegisterController
} from '../controller/vehicle.controller';

import {
    authMiddleware,
    authAdmin,
    authSocio
} from '../middlewares/auth'

const router = Router();

router.get('/vehicle', 
    authMiddleware as RequestHandler, 
    getRegistersController as RequestHandler
)

router.get("/vehicle/:id", 
    authMiddleware as RequestHandler, 
    getRegisterController as RequestHandler
);

router.post("/vehicle", 
    authMiddleware as RequestHandler, 
    authSocio as RequestHandler,
    createRegisterController as RequestHandler
);

router.put("/vehicle/:id", 
    authMiddleware as RequestHandler, 
    authSocio as RequestHandler,
    updateRegisterController as RequestHandler
);

router.delete("/vehicle/:id", 
    authMiddleware as RequestHandler, 
    authAdmin as RequestHandler,
    deleteRegisterController as RequestHandler
);


//? Indicador

router.get("/vehicle/ind/", (req, res) => {
    res.send('ok')
})


export default router;