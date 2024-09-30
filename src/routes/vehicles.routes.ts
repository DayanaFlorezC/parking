import { Router, RequestHandler } from "express";

import {
    createRegisterController,
    deleteRegisterController,
    getRegisterController,
    getRegistersController,
    updateRegisterController,
    createExitRegisterVeh
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

router.post("/vehicle/exit",
    authMiddleware as RequestHandler, 
    authSocio as RequestHandler,
    createExitRegisterVeh as RequestHandler
)

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


//? Indicadores

router.get("/vehicle/ind/earnings", (req, res) => {
    res.send('ok')
})

router.get("/vehicle/ind/registers", (req, res) => {
    res.send('ok')
})

router.get("/vehicle/ind/parkings", (req, res) => {
    res.send('ok')
})

router.get("/vehicle/ind/partners", (req, res) => {
    res.send('ok')
})


export default router;