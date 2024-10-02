import { Router, RequestHandler } from "express";

import {
    createRegisterController,
    deleteRegisterController,
    getRegisterController,
    getRegistersController,
    updateRegisterController,
    createExitRegisterVeh,
    getStadisticsVehicles,
    getEarningsControllers
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

/*
router.put("/vehicle/:id", 
    authMiddleware as RequestHandler, 
    authSocio as RequestHandler,
    updateRegisterController as RequestHandler
);
*/

router.delete("/vehicle/:id", 
    authMiddleware as RequestHandler, 
    authAdmin as RequestHandler,
    deleteRegisterController as RequestHandler
);


//? Indicadores

router.get("/vehicle/ind/earnings",  authMiddleware as RequestHandler, getEarningsControllers as RequestHandler)

router.get("/vehicle/ind/registers",  authMiddleware as RequestHandler, getStadisticsVehicles as RequestHandler)



export default router;