import { Router, RequestHandler } from "express";

import {
    createRegisterController,
    deleteRegisterController,
    getRegisterController,
    getRegistersController,
    updateRegisterController
} from '../controller/vehicle.controller'

const router = Router();

router.get('/vehicle', getRegistersController as RequestHandler)

router.get("/vehicle/:id", getRegisterController as RequestHandler);

router.post("/vehicle", createRegisterController as RequestHandler);

router.put("/vehicle/:id", updateRegisterController as RequestHandler);

router.delete("/vehicle/:id", deleteRegisterController as RequestHandler);


//? Indicador

router.get("/vehicle/ind/",(req, res)=>{
    res.send('ok')
} )


export default router;